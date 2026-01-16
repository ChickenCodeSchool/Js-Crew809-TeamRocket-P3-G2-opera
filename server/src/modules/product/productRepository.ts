import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

export type Product = {
  product_id: number;
  name: string;
  description: string;
  brand_id: number;
  price: number;
  color: string;
  release_date: string;
  is_featured: number;
  created_at: string;
  uptaded_at: string;
  gender: string;
};

class ProductRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM product WHERE product_id = ?",
      [id],
    );
    return rows[0] as Product;
  }
}

export default new ProductRepository();
