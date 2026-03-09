export interface ProductDTO {
  id?: number;
  name: string;
  description: string;
  price?: number;
  imageUrl?: string;
  stock?: number;
  
  // Additional fields from backend API
  visibleInMobileApp?: boolean;
  perishable?: boolean;
  store_id?: number;
  sku?: string;
  barcode?: string;
  cost_price?: number;
  tax_type?: string;
  tax_rate?: number;
  is_perishable?: boolean;
  expiry_date?: string;
  is_visible_in_mobile_app?: boolean;
  category_id?: number;
}

export class ProductDTO {}
