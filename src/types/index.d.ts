export type DataType =
  | "text"
  | "number"
  | "price"
  | "enum"
  | "action"
  | "autoId";

export type ActionType = "edit" | "delete" | "view" | "custom";
export type ActionStyle = "button" | "link" | "icon";

export interface ColumnConfig {
  id: string;
  label: string;
  dataType: DataType;
  options?: string[]; // For enum type
  renderAsBadge?: boolean; // For enum type
  currencySymbol?: string; // For price type
  actionType?: ActionType; // For action type
  actionStyle?: ActionStyle; // For action type
  customActionLabel?: string; // For custom action type
}

export interface TableConfig {
  columns: ColumnConfig[];
}
