<template>
  <div class="inventory">
    <div class="inventory__grid">
      <div
        v-for="pos in INVENTORY_CAPACITY"
        :key="pos"
        class="inventory__grid-item"
        :draggable="!!getInventoryItem(pos)"
        @click.prevent="showDetailItem(pos)"
        @dragstart="onDragStart($event, pos)"
        @dragover.prevent
        @dragenter.prevent
        @drop="onDrop($event, pos)"
      >
        <inventory-item :inventory-item="getInventoryItem(pos)" class="inventory__item" />
      </div>
    </div>

    <div
      class="inventory__item-details"
      :style="{
        right: isShowDetail ? '0' : '-100%',
      }"
      @click.prevent="isShowDetail = false"
    >
      {{ activeItem }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useInventoryStore } from "./store";

import InventoryItem from "./item.vue";

defineOptions({
  name: "inventory-grid",
});

const INVENTORY_CAPACITY = 25;

const { getInventoryItem, fetchInventoryItem, createInventoryItem, replaceInventoryItems } =
  useInventoryStore();

const isShowDetail = ref(false);
const activeItem = ref<number>();
const showDetailItem = (pos: number) => {
  const target = getInventoryItem(pos);
  if (!target) {
    createInventoryItem(pos);
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
    right: -100%;
    width: 250px;
    @include flex-center;

    background-color: #26262680;
    backdrop-filter: blur(12px);

    transition: all 0.5s ease-in-out;
  }
}
</style>
