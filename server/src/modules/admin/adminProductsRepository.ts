import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class AdminProductsRepository {
  // Récupérer tous les produits avec marque + image principale
  async findAllWithDetails(filters?: {
    search?: string;
    brandId?: number;
    categoryId?: number;
  }) {
    let query = `
  SELECT DISTINCT
    p.product_id,
    p.name,
    p.description,
    p.price,
    p.color,
    p.is_featured,
    p.created_at,
    b.brand_id,
    b.name AS brand_name,
    pi.url AS image_url,
    (SELECT SUM(st.quantity) 
     FROM size sz 
     JOIN stock st ON sz.stock_id = st.stock_id 
     WHERE sz.product_id = p.product_id) AS total_stock
  FROM product p
  LEFT JOIN brand b ON p.brand_id = b.brand_id
  LEFT JOIN product_image pi ON p.product_id = pi.product_id AND pi.is_main = 1
`;

    const conditions: string[] = [];
    const params: (string | number)[] = [];

    // ici on filtre recherche par nom
    if (filters?.search) {
      conditions.push("p.name LIKE ?");
      params.push(`%${filters.search}%`);
    }

    // ici on filtre par marque
    if (filters?.brandId) {
      conditions.push("p.brand_id = ?");
      params.push(filters.brandId);
    }

    // ici on filtre par catégorie
    if (filters?.categoryId) {
      query += " JOIN product_categories pc ON p.product_id = pc.product_id";
      conditions.push("pc.categorie_id = ?");
      params.push(filters.categoryId);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += " ORDER BY p.product_id DESC";

    const [rows] = await databaseClient.query<Rows>(query, params);
    return rows;
  }

  // ici on prends les marques
  async findAllBrands() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT brand_id, name FROM brand ORDER BY name",
    );
    return rows;
  }

  // ici on prends les categoeis
  async findAllCategories() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT categorie_id, name FROM categories ORDER BY name",
    );
    return rows;
  }
  async update(
    productId: number,
    data: {
      name?: string;
      description?: string;
      price?: number;
      color?: string;
    },
  ) {
    const fields: string[] = [];
    const values: (string | number)[] = [];

    if (data.name !== undefined) {
      fields.push("name = ?");
      values.push(data.name);
    }
    if (data.description !== undefined) {
      fields.push("description = ?");
      values.push(data.description);
    }
    if (data.price !== undefined) {
      fields.push("price = ?");
      values.push(data.price);
    }
    if (data.color !== undefined) {
      fields.push("color = ?");
      values.push(data.color);
    }

    if (fields.length === 0) {
      return null;
    }

    values.push(productId);

    const query = `UPDATE product SET ${fields.join(", ")} WHERE product_id = ?`;
    const [result] = await databaseClient.query(query, values);
    return result;
  }

  async delete(productId: number) {
    // Désactiver les contraintes temporairement
    await databaseClient.query("SET FOREIGN_KEY_CHECKS = 0");

    // Supprimer les données liées
    await databaseClient.query(
      "DELETE FROM product_categories WHERE product_id = ?",
      [productId],
    );
    await databaseClient.query(
      "DELETE FROM product_image WHERE product_id = ?",
      [productId],
    );
    await databaseClient.query("DELETE FROM size WHERE product_id = ?", [
      productId,
    ]);

    // Supprimer le produit
    const [result] = await databaseClient.query(
      "DELETE FROM product WHERE product_id = ?",
      [productId],
    );

    // Réactiver les contraintes
    await databaseClient.query("SET FOREIGN_KEY_CHECKS = 1");

    return result;
  }
}

export default new AdminProductsRepository();
