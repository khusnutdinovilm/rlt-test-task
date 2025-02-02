<template>
  <div class="inventory-details">
    <div class="inventory-details__close-btn" @click.prevent="$emit('close-details')">
      <cross-icon />
    </div>

    <div class="inventory-details__wrapper">
      <div class="inventory-details__header">
        <div class="inventory-details__cards">
          <div
            class="inventory-details__card inventory-details__card--primary"
            :style="{ backgroundColor: inventoryItem.color.primary }"
          ></div>

          <div
            class="inventory-details__card inventory-details__card--secondary"
            :style="{ backgroundColor: inventoryItem.color.secondary }"
          ></div>
        </div>
      </div>

      <div class="inventory-details__content">
        <div class="inventory-details__content-header">
          <app-skeleton width="211" height="30" border-radius="8" />
        </div>

        <div class="inventory-details__content-body">
          <app-skeleton width="211" height="10" border-radius="4" />
          <app-skeleton width="211" height="10" border-radius="4" />
          <app-skeleton width="211" height="10" border-radius="4" />
          <app-skeleton width="180" height="10" border-radius="4" />
          <app-skeleton width="80" height="10" border-radius="4" />
        </div>
      </div>

      <div class="inventory-details__footer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSkeleton from "app/skeleton.vue";
import CrossIcon from "icons/cross-icon.vue";
import type { IInventoryItem } from "./types";

defineOptions({
  name: "inventory-details",
});

defineProps<{
  inventoryItem: IInventoryItem;
}>();

defineEmits<{
  (e: "close-details"): void;
  (e: "delete-some-count", count: number): void;
}>();
</script>

<style lang="scss">
.inventory-details {
  position: relative;
  border-left: 1px solid $border-color;

  &__wrapper {
    padding: 0 15px;
  }

  &__header {
    @include flex-center;

    padding: 55px 0 30px;
    margin-bottom: 16px;

    border-bottom: 1px solid $border-color;
  }

  &__close-btn {
    @include flex-center;

    position: absolute;
    top: 8px;
    right: 8px;

    width: 24px;
    height: 24px;

    cursor: pointer;
  }

  &__cards {
    width: 130px;
    height: 130px;

    position: relative;
  }

  &__card {
    position: absolute;

    width: 116px;
    height: 116px;

    &--primary {
      bottom: 0;
    }

    &--secondary {
      right: 0;
      backdrop-filter: blur(12px);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0 4px;

    position: relative;

    &-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
  }
}
</style>
