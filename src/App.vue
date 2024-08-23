<script setup lang="ts">
import { provide, reactive, ref } from "vue";
import ExtractContainer from "./features/extract/views/ExtractContainer.vue";
import { ILinkedinPreviewData } from "./features/preview/config/types";
import { recovery_mode } from "./features/extract/config/constant";
import PreviewContainer from "./features/preview/views/PreviewContainer.vue";
import { apiClient } from "./api/client";
import { ENDPOINTS } from "./api/client/endpoints";

const mode = ref<string>(recovery_mode.LINKEDIN);
const isLoadContent = ref<boolean>(false);
const preview = ref<string | ILinkedinPreviewData[]>();
const previewTitle = ref<string>("");
const previewUrl = ref<string>("");

const summarizeActionState = reactive({
  isSummarizeLoading: false,
  isSummarizeError: false,
});

provide("extract_state", {
  isLoadContent,
  preview,
  previewTitle,
  previewUrl,
  mode,
});

const summarizeAction = async () => {
  console.log("summarize go !");
  summarizeActionState.isSummarizeLoading = true;

  try {
    const summary = await apiClient.post(ENDPOINTS.vertex, {
      srctext: preview.value,
      srctitle: previewTitle.value,
      srcurl: previewUrl.value,
    });
    summarizeActionState.isSummarizeLoading = false;
    console.log("summary => ", summary);
  } catch (error) {
    summarizeActionState.isSummarizeLoading = false;
    summarizeActionState.isSummarizeError = true;
  }
};
</script>

<template>
  <main>
    <v-theme-provider class="pa-10" theme="dark" with-background>
      <h1>Websummary</h1>

      <ExtractContainer />

      <PreviewContainer
        v-if="!isLoadContent && preview"
        :source="mode as any"
        :preview="preview as string | ILinkedinPreviewData[]"
      />

      <v-progress-circular
        v-if="summarizeActionState.isSummarizeLoading"
        model-value="20"
        :indeterminate="summarizeActionState.isSummarizeLoading"
      ></v-progress-circular>

      <div v-if="!isLoadContent && preview" class="mt-8">
        <v-btn
          color="secondary"
          :disabled="summarizeActionState.isSummarizeLoading"
          @click="summarizeAction"
          >sumarize</v-btn
        >
      </div>
    </v-theme-provider>
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 350px;
}
</style>
