<script setup lang="ts">
import { computed, watch } from "vue";
import { TAlertProps } from "./types";
import { CLOSE_ALERT_DELAY } from "./constants";

const emits = defineEmits<{
  "update:display": [value: boolean];
}>();

const display = computed({
  get() {
    return props.displayed;
  },
  set(newValue) {
    emits("update:display", newValue);
  },
});

const props = defineProps<TAlertProps>();

watch(
  () => props.displayed,
  () => {
    if (props.displayed) {
      display.value = true;
      setTimeout(() => {
        display.value = false;
      }, CLOSE_ALERT_DELAY);
    }
  }
);
</script>

<template>
  <v-alert v-if="display" :text="text" :title="title" :type="type"></v-alert>
</template>
