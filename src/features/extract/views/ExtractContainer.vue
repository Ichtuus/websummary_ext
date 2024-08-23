<script setup lang="ts">
import { inject } from "vue";
import ModeSelector from "../components/ModeSelector.vue";
import WAlert from "../components/base/WAlert.vue";
import { alert_mode_value } from "../components/base/constants";
import { createCurrentTabEventChrome, currentAction } from "../actions/chrome";

const { mode, preview, previewTitle, previewUrl, isLoadContent } =
  inject("extract_state");

const getTextPage = async () => {
  const { response, isContentLoadedSuccess, url } =
    await createCurrentTabEventChrome(currentAction(mode.value) as string);
  isLoadContent.value = isContentLoadedSuccess;

  if (response) {
    preview.value = response.content;
    previewTitle.value = response.title;
    previewUrl.value = url;
  }
};
</script>

<template>
  <ModeSelector
    :current-mode="mode"
    @update-mode="(emitedValue: string) => mode = emitedValue"
  />

  <div>
    <WAlert
      title="Extract succeed"
      text="You're content has extract, it's time to validate and send this to summarizer"
      :type="alert_mode_value.SUCCESS"
      v-model:displayed="isLoadContent"
      @update:display="(emitedValue: boolean) => (isLoadContent = emitedValue)"
    />

    <v-progress-circular
      v-if="isLoadContent"
      model-value="20"
      :indeterminate="isLoadContent"
    ></v-progress-circular>

    <div v-if="!isLoadContent && !preview">
      <span>You want to summarize {{ mode }} content?</span>
      <v-btn @click="getTextPage" size="x-small" :disabled="isLoadContent"
        >Click here</v-btn
      >
    </div>
  </div>
</template>
