<template>
  <footer class="app-footer">
    <app-skeleton height="36" border-radius="12" class="app-footer__content" />

    <div class="app-footer__cross-icon">
      <cross-icon />
    </div>
  </footer>
</template>

<script setup lang="ts">
import AppSkeleton from "app/skeleton.vue";
import CrossIcon from "icons/cross-icon.vue";

defineOptions({
  name: "app-footer",
});
</script>

<style lang="scss">
.app-footer {
  padding: 18px;
  padding-right: 68px;
  position: relative;

  &__cross-icon {
    @include flex-center;

    position: absolute;
    top: 8px;
    right: 8px;

    width: 24px;
    height: 24px;

    cursor: pointer;
  }
}
</style>
