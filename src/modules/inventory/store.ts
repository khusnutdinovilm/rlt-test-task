import { defineStore } from "pinia";
import { computed, ref } from "vue";

import inventoryService from "./service";
import type { IInventoryItem } from "./types";

export const useInventoryStore = defineStore("inventory-store", () => {
  const mapInventoryList = ref(new Map<number, IInventoryItem>());
  const inventoryList = computed(() => Array.from(mapInventoryList.value));

  const getInventoryItem = (pos: number) => mapInventoryList.value.get(pos);

  const fetchInventoryItem = async (): Promise<void> => {
    try {
      const data = await inventoryService.get();
      mapInventoryList.value = new Map(data.map(item => [item.pos, item]));
    } catch (error) {
      console.error(error);
    }
  };

  const addInventoryItem = async (pos: number): Promise<void> => {
    try {
      const newInventoryItem = await inventoryService.add(pos);
      mapInventoryList.value.set(pos, newInventoryItem);
    } catch (error) {
      console.error(error);
    }
  };

  const updateInventoryItem = async (
    pos: number,
    inventoryItem: Partial<IInventoryItem>,
  ): Promise<void> => {
    try {
      const updatedInventoryItem = await inventoryService.patch(pos, inventoryItem);

      if (updatedInventoryItem) {
        mapInventoryList.value.set(pos, updatedInventoryItem);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteInventoryItem = async (pos: number): Promise<void> => {
    try {
      await inventoryService.delete(pos);

      mapInventoryList.value.delete(pos);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    inventoryList,
    getInventoryItem,
    fetchInventoryItem,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
  };
});
