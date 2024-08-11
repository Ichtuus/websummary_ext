<script setup lang="ts">
import UserPreferenceContainer from "./features/views/UserPreferenceContainer.vue";
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
