<script setup lang="ts">
import { TPreviewLinkedinProps } from "../config/types";
import PreviewLinkedinItem from "./PreviewLinkedinItem.vue";
defineProps<TPreviewLinkedinProps>();
</script>

<template>
  <v-col v-for="(post, index) in preview" :key="index" cols="12" md="4">
    <PreviewLinkedinItem :post="post.post" />
  </v-col>
</template>
