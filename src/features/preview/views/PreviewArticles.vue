<script setup lang="ts">
import { TPreviewArticleProps } from "../config/types";

defineProps<TPreviewArticleProps>();
</script>

<template>
  <div class="flex-grow-1 text-center overflow-auto h200">
    {{ preview }}
  </div>
</template>
