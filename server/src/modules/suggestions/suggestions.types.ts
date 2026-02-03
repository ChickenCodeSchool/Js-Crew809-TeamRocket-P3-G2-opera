export interface CurrentProduct {
  brand_id: number;
  color: string;
  category_ids: string | null;
}

export interface SuggestionProduct {
  product_id: number;
  name: string;
  price: number;
  color: string;
  image_url: string | null;
  product_categories: string | null;
}

export type DatabaseQueryResult<T> = [T[], unknown];
