<template>
  <div class="app-sidebar">
    <div class="app-sidebar__image-block">
      <img src="/assets/img/img.png" alt="" class="app-sidebar__image" />
    </div>

    <div class="app-sidebar__content">
      <app-skeleton width="190" height="26" class="app-sidebar__content-header" />

      <div class="app-sidebar__content-body">
        <app-skeleton width="155" height="10" />
        <app-skeleton height="10" />
        <app-skeleton width="170" height="10" />
        <app-skeleton width="160" height="10" />
        <app-skeleton width="140" height="10" />
      </div>

      <app-skeleton width="80" height="10" border-radius="4" class="app-sidebar__content-footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSkeleton from "components/app/skeleton.vue";

defineOptions({
  name: "app-sidebar",
});
</script>

<style lang="scss">
.app-sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  padding: 18px 14px 24px;

  &__image-block {
    width: 208px;
    height: 240px;
    border-radius: 8px;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    display: block;
    filter: blur(12px);
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    &-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
  }
}
</style>
