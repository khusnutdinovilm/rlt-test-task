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
  {
    primary: "#AA6565",
    secondary: "#D9989859",
  },
  {
    primary: "#65AA88",
    secondary: "#98D9BB59",
  },
  {
    primary: "#AA65A0",
    secondary: "#D998D259",
  },
  {
    primary: "#65A3AA",
    secondary: "#98D1D959",
  },
  {
    primary: "#AAA165",
    secondary: "#D9D19859",
  },
  {
    primary: "#8265AA",
    secondary: "#B399D959",
  },
  {
    primary: "#65AA6F",
    secondary: "#98D9A659",
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

  async create(pos: number, count: number): Promise<IInventoryItem> {
    const color = this._getRandomColor();

    const newInventoryItem: IInventoryItem = {
      pos,
      color,
      count,
    };

    this._mapInventoryList.set(pos, newInventoryItem);

    this._saveInventoryList();

    return newInventoryItem;
  }

  async replace(initPos: number, targetPos: number): Promise<IInventoryItem[]> {
    let data: IInventoryItem[] = [];

    const targetInventoryItem = this._mapInventoryList.get(targetPos);
    const initInventoryItem = this._mapInventoryList.get(initPos);

    if (!initInventoryItem) {
      throw new Error("Нет перетаскиваемого элемента");
    }

    if (targetInventoryItem) {
      const newInitInventoryItem = {
        ...targetInventoryItem,
        pos: initPos,
      };
      const newTargetInventoryItem = {
        ...initInventoryItem,
        pos: targetPos,
      };

      this._mapInventoryList.set(initPos, newInitInventoryItem);
      this._mapInventoryList.set(targetPos, newTargetInventoryItem);

      data = [newInitInventoryItem, newTargetInventoryItem];
    } else {
      const newInventoryItem = {
        ...initInventoryItem,
        pos: targetPos,
      };

      this._mapInventoryList.delete(initPos);
      this._mapInventoryList.set(targetPos, newInventoryItem);

      data = [newInventoryItem];
    }

    this._saveInventoryList();

    return data;
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
