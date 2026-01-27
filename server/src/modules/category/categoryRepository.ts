import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type Category = {
  categorie_id: number;
  name: string;
};

class CategoryRepository {
  // Toutes les catégories
  async findAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM categories");
    return rows as Category[];
  }

  // Catégories d'une marque spécifique
  async findByBrand(brandId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT DISTINCT c.* 
       FROM categories c
       JOIN product_categories pc ON c.categorie_id = pc.categorie_id
       JOIN product p ON pc.product_id = p.product_id
       WHERE p.brand_id = ?`,
      [brandId],
    );
    return rows as Category[];
  }

  async findProductsByCategory(categoryId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT p.* FROM product p
       JOIN product_categories pc ON p.product_id = pc.product_id
       WHERE pc.categorie_id = ?`,
      [categoryId],
    );
    return rows;
  }

  async findProductsByBrandAndCategory(brandId: number, categoryId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT p.*, pi.url as image_url
       FROM product p
       JOIN product_categories pc ON p.product_id = pc.product_id
       LEFT JOIN product_image pi ON p.product_id = pi.product_id AND pi.is_main = 1
       WHERE p.brand_id = ? AND pc.categorie_id = ?`,
      [brandId, categoryId],
    );
    return rows;
  }

  async addProductToCategory(productId: number, categoryId: number) {
    await databaseClient.query(
      `INSERT INTO product_categories (product_id, categorie_id)
     VALUES (?, ?)`,
      [productId, categoryId],
    );
  }
}

export default new CategoryRepository();
