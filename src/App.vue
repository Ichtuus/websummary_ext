<script setup lang="ts">
import { provide, ref } from "vue";
import ExtractContainer from "./features/extract/views/ExtractContainer.vue";
import { ILinkedinPreviewData } from "./features/preview/config/types";
import { recovery_mode } from "./features/extract/config/constant";
import PreviewContainer from "./features/preview/views/PreviewContainer.vue";

const mode = ref<string>(recovery_mode.LINKEDIN);
const isLoadContent = ref<boolean>(false);
const preview = ref<string | ILinkedinPreviewData[]>();

provide("extract_state", {
  isLoadContent,
  preview,
  mode,
});
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

      <div v-if="!isLoadContent && preview" class="mt-8">
        <v-btn color="secondary">sumarize</v-btn>
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
