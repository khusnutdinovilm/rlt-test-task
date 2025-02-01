export interface IInventaryColor {
  primary: string;
  secondary: string;
}

export interface IInventoryItem {
  pos: number;
  count: number;
  color: IInventaryColor;
}
