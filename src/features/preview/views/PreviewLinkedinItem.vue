<script setup lang="ts">
import { inject } from "vue";
import { TPreviewLinkedinItemProps } from "../config/types";
import { data_provider } from "../config/constants";

defineProps<TPreviewLinkedinItemProps>();
const summarizeAction = inject(data_provider.SUMMARIZE_ACTION);

const getSelectedPost = (post: string) => {
  (summarizeAction as Function)(post);
};
</script>

<template>
  <v-item v-slot="{ isSelected, selectedClass }">
    <v-card
      :class="['d-flex align-center', selectedClass]"
      dark
      @click="getSelectedPost(post)"
    >
      <div class="flex-grow-1 text-center h200 overflow-auto">
        {{ post }} {{ isSelected }}
      </div>
    </v-card>
  </v-item>
</template>
