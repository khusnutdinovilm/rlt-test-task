<template>
  <div class="inventory">
    <div class="inventory__grid">
      <div
        v-for="pos in INVENTORY_CAPACITY"
        :key="pos"
        class="inventory__grid-item"
        :draggable="!!getInventoryItem(pos)"
        @click.prevent="onClickGridElement(pos)"
        @dragstart="onDragStart($event, pos)"
        @dragover.prevent
        @dragenter.prevent
        @drop="onDrop($event, pos)"
      >
        <inventory-item :inventory-item="getInventoryItem(pos)" class="inventory__item" />
      </div>
    </div>

    <inventory-details
      v-if="activeInventoryItem"
      :inventory-item="activeInventoryItem"
      class="inventory__item-details"
      :style="{ right: isShowInventoryItemDetails ? '0px' : '-100%' }"
      @close-details="closeInventorItemDetails"
      @delete-some-count="deleteSomeCount"
    />

    <div
      v-if="isShowInventoryItemDetails"
      class="inventory__bg"
      @click.prevent="closeInventorItemDetails"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useInventoryStore } from "./store";

import InventoryDetails from "./details.vue";
import InventoryItem from "./item.vue";
import type { IInventoryItem } from "./types";

defineOptions({
  name: "inventory-grid",
});

const INVENTORY_CAPACITY = 25;

const {
  getInventoryItem,
  fetchInventoryItem,
  createInventoryItem,
  replaceInventoryItems,
  updateInventoryItem,
  deleteInventoryItem,
} = useInventoryStore();

const onClickGridElement = (pos: number) => {
  const targetElement = getInventoryItem(pos);

  if (!targetElement) {
    createInventoryItem(pos);
  } else {
    showInventorItemDetails(targetElement);
  }
};

const isShowInventoryItemDetails = ref(false);
const activeInventoryItem = ref<IInventoryItem>();
const showInventorItemDetails = (inventoryItem: IInventoryItem) => {
  activeInventoryItem.value = inventoryItem as IInventoryItem;
  isShowInventoryItemDetails.value = true;
};
const closeInventorItemDetails = () => (isShowInventoryItemDetails.value = false);

const deleteSomeCount = (deletedCount: number) => {
  const pos = activeInventoryItem.value?.pos as number;
  const count = activeInventoryItem.value?.count as number;

  if (deletedCount === count) {
    deleteInventoryItem(pos);
  } else {
    const remainingCount = count - deletedCount;
    updateInventoryItem(pos, { count: remainingCount });
  }
};

const onDragStart = (event: DragEvent, pos: number) => {
  if (!event.dataTransfer) return;

  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("init-pos", String(pos));
};

const onDrop = (event: DragEvent, targetPos: number) => {
  if (!event.dataTransfer) return;

  const initPos = Number(event.dataTransfer.getData("init-pos"));

  replaceInventoryItems(initPos, targetPos);
};

onMounted(async () => {
  await fetchInventoryItem();
});
</script>

<style lang="scss">
.inventory {
  overflow: hidden;
  position: relative;

  &__grid {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 1px;

    &-item {
      @include flex-center;

      background-color: $dark;

      &:hover {
        background-color: #2f2f2f;
        cursor: pointer;
      }
    }
  }

  &__item {
    width: 100%;
    height: 100%;
  }

  &__item-details {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;

    background-color: #26262680;
    backdrop-filter: blur(12px);

    transition: all 0.5s ease-out;
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    // background-color: black;
    width: 100%;
    height: 100%;
  }
}
</style>
