<template>
  <div class="inventory">
    <div class="inventory__grid">
      <div
        v-for="item in INVENTORY_CAPACITY"
        :key="item"
        class="inventory__grid-item"
        @click.prevent="showDetailItem(item)"
      >
        {{ item }}
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
import { ref } from "vue";

defineOptions({
  name: "inventory-grid",
});

const INVENTORY_CAPACITY = 25;

const isShowDetail = ref(false);
const activeItem = ref<number>();
const showDetailItem = (item: number) => {
  activeItem.value = item;
  isShowDetail.value = true;
};
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
      background-color: $dark;
      @include flex-center;
    }
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
