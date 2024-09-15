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
  isNotAuthorized: false,
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

    if (summary.status === 401) {
      summarizeActionState.isNotAuthorized = true;
      return;
    }

    chrome.tabs.create({ url: "http://localhost:5173/dashboard/summaries" });
  } catch (error) {
    summarizeActionState.isSummarizeLoading = false;
    summarizeActionState.isSummarizeError = true;
  }
};

const redirectToAdmin = () => {
  chrome.tabs.create({ url: "http://localhost:5173?redirectFrom=extension" });
};
</script>

<template>
  <main>
    <v-theme-provider class="pa-10" theme="dark" with-background>
      <h1>Websummary</h1>
      <div v-if="!summarizeActionState.isNotAuthorized">
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
      </div>

      <div v-else>
        <p class="mb-5">
          You are not authorized to access this application. Please go register
          to application for using this extension.
        </p>
        <v-btn color="warning" @click="redirectToAdmin">Register</v-btn>
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
