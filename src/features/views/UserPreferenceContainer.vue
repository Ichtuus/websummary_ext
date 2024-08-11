<script setup lang="ts">
import { ref } from "vue";
import ModeSelector from "../components/ModeSelector.vue";
import { recovery_mode } from "../config/constant";
import WAlert from "../components/base/WAlert.vue";
import { alert_mode_value } from "../components/base/constants";
import { createCurrentTabEventChrome, currentAction } from "../actions/chrome";
import UserPreferencePreview from "./UserPreferencePreview.vue";

const mode = ref<string>(recovery_mode.LINKEDIN);
const preview = ref<string>("");
const isLoadContent = ref<boolean>(false);

const getTextPage = async () => {
  console.log("get text");
  const { response, isContentLoadedSuccess } =
    await createCurrentTabEventChrome(currentAction(mode.value) as string);

  isLoadContent.value = isContentLoadedSuccess;
  if (response) {
    preview.value = response.content;
  }
};
</script>

<template>
  <ModeSelector
    :current-mode="mode"
    @update-mode="(emitedValue: string) => mode = emitedValue"
  />

  <p>
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

    <UserPreferencePreview v-if="!isLoadContent" :preview="preview" />

    <span v-if="!isLoadContent">You want to summarize {{ mode }} content</span>
    <v-btn @click="getTextPage" size="x-small" :disabled="isLoadContent"
      >Click here</v-btn
    >
  </p>
</template>
