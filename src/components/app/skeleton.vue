<template>
  <div class="app-skeleton" :style="skeletonStyles"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "app-skeleton",
});

const props = defineProps<{
  width?: string;
  height?: string;
  borderRadius?: string;
}>();

const skeletonStyles = computed(() => ({
  width: props.width ? `${props.width}px` : "100%",
  height: props.height ? `${props.height}px` : "100%",
  borderRadius: props.borderRadius ? `${props.borderRadius}px` : "8px",
}));
</script>

<style lang="scss">
.app-skeleton {
  background-color: #3c3c3c;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #3c3c3c 0%, #444444 51.04%, #333333 100%);
    animation: animation 3s infinite;
  }
}

@keyframes animation {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
