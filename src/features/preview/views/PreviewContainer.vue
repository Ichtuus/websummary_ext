<script setup lang="ts">
import { recovery_mode } from "../../extract/config/constant";
import { ILinkedinPreviewData, TPreviewContainerProps } from "../config/types";
import PreviewArticles from "./PreviewArticles.vue";
import PreviewLinkedinContainer from "./PreviewLinkedinContainer.vue";

defineProps<TPreviewContainerProps>();
</script>

<template>
  <template v-if="source === recovery_mode.ARTICLE">
    <PreviewArticles :preview="preview as string" />
  </template>

  <template v-if="source === recovery_mode.LINKEDIN">
    <PreviewLinkedinContainer :preview="preview as ILinkedinPreviewData[]" />
  </template>
</template>
