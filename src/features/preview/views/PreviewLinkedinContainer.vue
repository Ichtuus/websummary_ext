<script setup lang="ts">
import { provide } from "vue";
import { TPreviewLinkedinProps } from "../config/types";
import PreviewLinkedinList from "./PreviewLinkedinList.vue";
import { data_provider } from "../config/constants";

defineProps<TPreviewLinkedinProps>();

const summarizeAction = (post: string) => {
  console.log("event receive:", post);
  /* Next step is create service to send the string of article or linkedin post 
       to the admin in order to summarize the content
    */
};
provide(data_provider.SUMMARIZE_ACTION, summarizeAction);
</script>

<template>
  <v-item-group selected-class="bg-primary">
    <v-container>
      <v-row>
        <PreviewLinkedinList :preview="preview" />
      </v-row>
    </v-container>
  </v-item-group>
</template>
