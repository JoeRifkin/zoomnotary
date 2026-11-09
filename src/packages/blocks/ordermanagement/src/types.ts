// Customizable Area Start
export interface AccountAttributes {
  activated: boolean;
  email: string;
  first_name: string;
  full_phone_number: string;
  last_name: string;
  type: string;
  created_at: Date;
  updated_at: Date;
  unique_auth_id: string;
}

export interface Account {
  id: string;
  type: string;
  attributes: AccountAttributes;
}

export interface OrderStatuses {
  order_number: string;
  placed_at?: Date;
  confirmed_at?: Date;
  in_transit_at?: Date;
  delivered_at?: Date;
  cancelled_at?: Date;
  refunded_at?: Date;
}

export interface Category {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface SubCategory {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Brand {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  currency: string;
}

export interface CatalogueVariantAttributes {
  id: number;
  catalogue_id: number;
  catalogue_variant_color_id?: number;
  catalogue_variant_size_id?: number;
  price: string;
  stock_qty?: number;
  on_sale?: boolean;
  sale_price: string;
  discount_price: string;
  length?: number;
  breadth?: number;
  height?: number;
  created_at: Date;
  updated_at: Date;
}

export interface CatalogueVariant {
  id: string;
  type: string;
  attributes: CatalogueVariantAttributes;
}

export interface CatalogueAttributes {
  category: Category;
  sub_category: SubCategory;
  brand: Brand;
  name: string;
  sku: string;
  description: string;
  manufacture_date: Date;
  length: number;
  breadth: number;
  height: number;
  stock_qty: number;
  availability: string;
  weight: string;
  price: number;
  recommended: boolean;
  on_sale: boolean;
  average_rating: number;
  catalogue_variants: CatalogueVariant[];
}

export interface Catalogue {
  id: string;
  type: string;
  attributes: CatalogueAttributes;
}

export interface OrderItemAttributes {
  id: number;
  order_management_order_id: number;
  quantity: number;
  unit_price: string;
  total_price: string;
  status: string;
  catalogue_id: number;
  catalogue_variant_id: number;
  order_status_id: number;
  manage_placed_status: boolean;
  manage_cancelled_status: boolean;
  created_at: Date;
  updated_at: Date;
  order_statuses: OrderStatuses;
  catalogue: Catalogue;
}

export interface OrderItem {
  id: string;
  type: "order_item";
  attributes: OrderItemAttributes;
}

export interface OrderAttributes {
  id: number;
  order_number: string;
  account_id: number;
  sub_total: string;
  total: string;
  status: string;
  applied_discount: string;
  order_status_id: number;
  is_group: boolean;
  is_availability_checked: boolean;
  shipping_charge: string;
  shipping_discount: string;
  shipping_net_amt: string;
  shipping_total: string;
  total_tax: number;
  created_at: Date;
  updated_at: Date;
  account: Account;
  order_items: OrderItem[];
  delivery_addresses: Address["attributes"][];
}

export interface Order {
  id: string;
  type: "order";
  attributes: OrderAttributes;
}

export interface Address {
  id: string;
  type: string;
  attributes: {
    id: number;
    account_id: number;
    address: string;
    name: string;
    flat_no: string;
    zip_code: string;
    phone_number: string;
    deleted_at: null | string;
    latitude: null | number | string;
    longitude: null | number | string;
    residential: boolean;
    city: null | string;
    state_code: null | string;
    country_code: null | string;
    state: null | string;
    country: null | string;
    address_line_2: null | string;
    address_type: null | string;
    address_for: string;
    is_default: false;
    landmark: null | string;
    created_at: string;
    updated_at: string;
  };
}

export interface TextFields {
  name: string,
  value: string,
  placeholder: string,
  testId: string,
}
// Customizable Area End
