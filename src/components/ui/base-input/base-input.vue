<template>
  <div class="base-input" :class="inputClasses">
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      class="base-input__field"
      @keypress="onKeyPress"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { IBaseInputProps } from "./types";

defineOptions({
  name: "base-input",
});

const props = withDefaults(defineProps<IBaseInputProps>(), {
  type: "text",
});

const model = defineModel<string | number>({
  required: true,
  default: "",
});

const inputClasses = computed(() => ({
  "base-input--danger": props.error,
}));

const onKeyPress = (event: KeyboardEvent) => {
  if (props.type === "number" && !/[\d]/.test(event.key)) {
    event.preventDefault();
  }
};
</script>
