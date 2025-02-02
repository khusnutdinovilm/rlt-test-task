<template>
  <button class="base-button" :class="btnClasses">
    <div v-if="loading" class="loader"></div>
    <div v-else class="base-button__content">
      {{ labelText }}
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { IBaseButtonProps } from "./types";

defineOptions({
  name: "base-button",
});

const props = withDefaults(defineProps<IBaseButtonProps>(), {
  type: "primary",
});

const btnClasses = computed(() => ({
  "base-button--primary": props.type === "primary",
  "base-button--danger": props.type === "danger",
}));
</script>
