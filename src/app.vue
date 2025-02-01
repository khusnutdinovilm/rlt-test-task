<template>
  <main class="container main">
    <div class="main__sidebar"></div>
    <div class="main__content"></div>
    <app-footer class="main__footer" />
  </main>
</template>

<script setup lang="ts">
import AppFooter from "app/footer.vue";
</script>

<style lang="scss">
.main {
  display: grid;
  grid-template-columns: 236px 525px;
  grid-template-rows: auto auto;
  gap: 10px;

  &__sidebar {
    @include primary-border;
    @include bg-dark;

    grid-column: 1;
    grid-row: 1;
  }

  &__content {
    @include primary-border;
    background-color: $border-color;

    grid-column: 2;
    grid-row: 1;
  }

  &__footer {
    @include primary-border;
    @include bg-dark;

    grid-column: 1 / span 2;
    grid-row: 2;
  }
}
</style>
