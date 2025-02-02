<template>
  <teleport to="body">
    <transition name="base-modal">
      <div v-if="isShowModal" class="base-modal" @click.prevent="isShowModal = false">
        <div class="base-modal__body" @click.stop>
          <div class="base-modal__header">
            <div class="base-modal__title">
              {{ modalTitle }}
            </div>

            <div class="base-modal__close-icon" @click.prevent="isShowModal = false">
              <cross-icon />
            </div>
          </div>

          <div v-if="$slots['base-modal-content']" class="base-modal__content">
            <slot name="base-modal-content"></slot>
          </div>

          <div v-if="$slots['base-modal-btns']" class="base-modal__btns">
            <slot name="base-modal-btns"></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import CrossIcon from "icons/cross-icon.vue";

defineOptions({
  name: "base-modal",
});

defineProps<{
  modalTitle: string;
}>();

const isShowModal = defineModel<boolean>({
  required: true,
  default: false,
});
</script>
