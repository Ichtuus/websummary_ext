<script setup lang="ts">
import { computed } from "vue";
import { TModeSelectorProps } from "../config/types";
import { recovery_mode } from "../config/constant";

const props = defineProps<TModeSelectorProps>();

const emits = defineEmits<{
  "update-mode": [value: string];
}>();

const mode = [
  { label: "Linkedin", value: recovery_mode.LINKEDIN },
  { label: "Articles", value: recovery_mode.ARTICLE },
];

const updateMode = computed({
  get() {
    return props.currentMode;
  },
  set(newValue) {
    emits("update-mode", newValue);
  },
});
</script>

<template>
  <v-radio-group inline v-model:model-value="updateMode">
    <v-radio
      v-for="item in mode"
      :label="item.label"
      :value="item.value"
    ></v-radio>
  </v-radio-group>
</template>
