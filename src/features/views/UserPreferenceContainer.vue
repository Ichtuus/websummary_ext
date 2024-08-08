<script setup lang="ts">
import { ref } from "vue";
import ModeSelector from "../components/ModeSelector.vue";
import { chrome_actions, recovery_mode } from "../config/constant";

const mode = ref<string>(recovery_mode.LINKEDIN);

const getTextPage = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];

    chrome.tabs.sendMessage(
      activeTab.id as number,
      { action: chrome_actions.EXTRACT_CONTENT },
      (response) => {
        if (response && response.content) {
          // do something... need to format the response
        }
      }
    );
  });
};
</script>

<template>
  <ModeSelector
    v-model:current-mode="mode"
    @update-mode="(emitedValue: string) => mode = emitedValue"
  />

  <p>
    You want to summarize {{ mode }} content
    <v-btn @click="getTextPage" size="x-small">Click here</v-btn>
  </p>
</template>
