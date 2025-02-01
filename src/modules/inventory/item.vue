<template>
  <div v-if="inventoryItem" class="inventory-item">
    <div class="inventory-item__cards">
      <div
        class="inventory-item__card inventory-item__card--primary"
        :style="{ backgroundColor: inventoryItem.color.primary }"
      ></div>

      <div
        class="inventory-item__card inventory-item__card--secondary"
        :style="{ backgroundColor: inventoryItem.color.secondary }"
      ></div>
    </div>

    <div class="inventory-item__count">
      {{ inventoryItem.count }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IInventoryItem } from "./types";

defineOptions({
  name: "inventory-item",
});

defineProps<{
  inventoryItem?: IInventoryItem;
}>();
</script>

<style lang="scss">
.inventory-item {
  @include flex-center;

  position: relative;

  &__cards {
    width: 54px;
    height: 54px;

    position: relative;
  }

  &__card {
    position: absolute;

    width: 48px;
    height: 48px;

    &--primary {
      bottom: 0;
    }

    &--secondary {
      right: 0;
      backdrop-filter: blur(12px);
    }
  }

  &__count {
    @include flex-center;

    position: absolute;
    bottom: 0;
    right: 0;

    width: 16px;
    height: 16px;

    border: 1px solid $border-color;
    border-top-left-radius: 6px;

    font-size: 10px;
    font-weight: 500;
    line-height: 12px;

    color: #ffffff;

    opacity: 0.4;
  }
}
</style>
