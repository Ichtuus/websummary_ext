<script setup lang="ts">
import { onMounted, ref } from "vue";
import { apiClient } from "./config/api";
import { ENDPOINTS } from "./config/api/endpoints";
import UserPreferenceContainer from "./features/views/UserPreferenceContainer.vue";

const page_data = ref(null);
function extractContent() {
  console.log("COUCou");

  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "textSelected") {
      console.log("request.text", request.text);
      page_data.value = request.text;
    }
  });
}

// async function test() {
//   console.log("call landing page here");
//   // await apiClient.post(ENDPOINTS.vertex, page_data.value);
// }

onMounted(() => {
  // extractContent();
  // const pageText = document.body.innerText;
  // console.log("TEEEXT", pageText);
});
</script>

<template>
  <main>
    <v-theme-provider class="pa-10" theme="dark" with-background>
      <h1>Websummary</h1>
      <UserPreferenceContainer />
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
