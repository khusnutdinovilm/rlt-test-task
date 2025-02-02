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

      <div
        class="inventory-details__footer"
        :class="{ 'inventory-details__footer--bg': isDeleteProcessing }"
      >
        <div class="inventory-details__footer-content">
          <base-button
            v-if="!isDeleteProcessing"
            label-text="Удалить предмет"
            type="danger"
            @click.prevent="isDeleteProcessing = true"
          />
          <div v-else class="inventory-details__footer-form">
            <div class="inventory-details__footer-field">
              <base-input v-model="count" type="number" placeholder="Введите количество" />
            </div>

            <div class="inventory-details__footer-btns">
              <base-button label-text="Отменить" @click.prevent="isDeleteProcessing = false" />
              <base-button
                label-text="Подтвердить"
                type="danger"
                @click.prevent="$emit('delete-some-count', count)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSkeleton from "app/skeleton.vue";
import CrossIcon from "icons/cross-icon.vue";
import BaseButton from "ui/base-button";
import BaseInput from "ui/base-input";
import { ref } from "vue";
import type { IInventoryItem } from "./types";

defineOptions({
  name: "inventory-details",
});

const props = defineProps<{
  inventoryItem: IInventoryItem;
}>();

defineEmits<{
  (e: "close-details"): void;
  (e: "delete-some-count", count: number): void;
}>();

const count = ref(props.inventoryItem.count);

const isDeleteProcessing = ref(false);
</script>

<style lang="scss">
.inventory-details {
  position: relative;
  border-left: 1px solid $border-color;

  &__wrapper {
    padding: 0 15px;
    height: 100%;
    position: relative;
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
    z-index: 1;

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

  &__footer {
    position: absolute;
    bottom: 0;

    padding: 18px 0;

    width: 100%;
    margin: 0 -15px;
    padding-left: 15px;
    padding-right: 15px;

    &--bg {
      border-top: 1px solid $border-color;
      background-color: #26262699;
      backdrop-filter: blur(16px);
    }

    &-content {
      & .base-button {
        width: 100%;
      }
    }

    &-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &-btns {
      display: flex;
      gap: 10px;

      align-items: stretch;

      & .base-button:nth-child(1) {
        flex: 0;
      }
    }
  }
}
</style>
