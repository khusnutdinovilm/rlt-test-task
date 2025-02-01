import type { IInventaryColor, IInventoryItem } from "./types";

const colors: IInventaryColor[] = [
  {
    primary: "#7FAA65",
    secondary: "#B8D99859",
  },
  {
    primary: "#AA9765",
    secondary: "#D9BB9859",
  },
  {
    primary: "#656CAA",
    secondary: "#7481ED59",
  },
];

class InventoryService {
  private _mapInventoryList: Map<number, IInventoryItem>;

  constructor() {
    this._mapInventoryList = new Map<number, IInventoryItem>();
  }

  get inventoryList(): IInventoryItem[] {
    return Array.from(this._mapInventoryList.values());
  }

  private _saveInventoryList() {
    localStorage.setItem("inventory-list", JSON.stringify(this.inventoryList));
  }

  async get(): Promise<IInventoryItem[]> {
    const inventoryList_LS = localStorage.getItem("inventory-list");

    if (inventoryList_LS) {
      const inventoryList: IInventoryItem[] = JSON.parse(inventoryList_LS);
      this._mapInventoryList = new Map(inventoryList.map(item => [item.pos, item]));
      return this.inventoryList;
    } else {
      return [];
    }
  }

  async add(pos: number): Promise<IInventoryItem> {
    const color = this._getRandomColor();

    const newInventoryItem: IInventoryItem = {
      pos,
      color,
      count: 1,
    };

    this._mapInventoryList.set(pos, newInventoryItem);

    this._saveInventoryList();

    return newInventoryItem;
  }

  async patch(
    pos: number,
    inventoryItem: Partial<IInventoryItem>,
  ): Promise<IInventoryItem | undefined> {
    const target = this._mapInventoryList.get(pos);

    if (!target) {
      throw new Error(`Нет элемента с pos = ${pos}`);
    } else {
      const updatedInventoryItem = {
        ...target,
        ...inventoryItem,
      };

      this._mapInventoryList.set(pos, updatedInventoryItem);

      this._saveInventoryList();

      return updatedInventoryItem;
    }
  }

  async delete(pos: number): Promise<void> {
    if (!this._mapInventoryList.get(pos)) {
      throw new Error(`Нет элемента с pos = ${pos}`);
    }

    this._mapInventoryList.delete(pos);

    this._saveInventoryList();
  }

  private _getRandomColor(): IInventaryColor {
    const randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
  }
}

export default new InventoryService();
