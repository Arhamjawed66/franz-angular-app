export interface InventoryDTO {
  id?: number;
  name: string;
  description: string;

  store_id?: number;
  inventory_received_date: string;
  stock_quantity?: number;
  min_stock_level?: number;
  max_stock_level?: number;
  batch_no?: string;
  supplier_id?: number;
  product_id?: number;
}

export class InventoryDTO {}