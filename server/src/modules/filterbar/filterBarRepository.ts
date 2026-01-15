import database from "../../../database/client";
import type { Rows } from "../../../database/client";

class FilterBarRepository {
  async readFiltered(
    brandId: number,
    categoryId?: number,
    color?: string,
    size?: string,
    priceRange?: string,
  ) {
    let sql = `
      SELECT DISTINCT p.product_id, p.name, p.price, p.color, pi.url as image_url
      FROM product p
      JOIN product_categories pc ON p.product_id = pc.product_id
      LEFT JOIN product_image pi ON p.product_id = pi.product_id AND pi.is_main = 1
      LEFT JOIN size s ON p.product_id = s.product_id 
      WHERE p.brand_id = ?
    `;

    const params: (string | number)[] = [brandId];

    if (categoryId) {
      sql += " AND pc.categorie_id = ?";
      params.push(categoryId);
    }

    if (color) {
      sql += " AND p.color LIKE ?";
      params.push(`%${color}%`);
    }

    if (size) {
      sql += " AND s.size_label = ?";
      params.push(size);
    }

    if (priceRange) {
      const [minStr, maxStr] = priceRange.split("-");
      if (minStr && minStr !== "") {
        sql += " AND p.price >= ?";
        params.push(Number(minStr));
      }
      if (maxStr && maxStr !== "") {
        sql += " AND p.price <= ?";
        params.push(Number(maxStr));
      }
    }

    const [rows] = await database.query<Rows>(sql, params);
    return rows;
  }

  async readAllCategories(brandId?: number) {
    if (brandId) {
      const sql = `
        SELECT DISTINCT c.categorie_id AS id, c.name
        FROM categories c
        JOIN product_categories pc ON c.categorie_id = pc.categorie_id
        JOIN product p ON pc.product_id = p.product_id
        WHERE p.brand_id = ?
        ORDER BY c.name ASC
      `;
      const [rows] = await database.query<Rows>(sql, [brandId]);
      return rows;
    }
    const [rows] = await database.query<Rows>(
      "SELECT categorie_id AS id, name FROM categories ORDER BY name ASC",
    );
    return rows;
  }

  async readAllBrands(categoryId?: number) {
    if (categoryId) {
      const sql = `
        SELECT DISTINCT 
          b.brand_id AS id, 
          b.name,
          (
            SELECT pc_sub.categorie_id 
            FROM product p_sub
            JOIN product_categories pc_sub ON p_sub.product_id = pc_sub.product_id
            WHERE p_sub.brand_id = b.brand_id
            LIMIT 1
          ) AS default_category_id
        FROM brand b
        JOIN product p ON b.brand_id = p.brand_id
        JOIN product_categories pc ON p.product_id = pc.product_id
        WHERE pc.categorie_id = ?
        ORDER BY b.name ASC
      `;
      const [rows] = await database.query<Rows>(sql, [categoryId]);
      return rows;
    }

    const sql = `
      SELECT 
        b.brand_id AS id, 
        b.name,
        (
          SELECT pc.categorie_id 
          FROM product p
          JOIN product_categories pc ON p.product_id = pc.product_id
          WHERE p.brand_id = b.brand_id
          LIMIT 1
        ) AS default_category_id
      FROM brand b 
      ORDER BY b.name ASC
    `;
    const [rows] = await database.query<Rows>(sql);
    return rows;
  }

  async readSizes(brandId: number, categoryId?: number) {
    let sql = `
      SELECT DISTINCT s.size_label
      FROM size s
      JOIN product p ON s.product_id = p.product_id
      JOIN product_categories pc ON p.product_id = pc.product_id
      WHERE p.brand_id = ?
    `;
    const params: (string | number)[] = [brandId];
    if (categoryId) {
      sql += " AND pc.categorie_id = ?";
      params.push(categoryId);
    }
    sql += " ORDER BY s.size_label ASC";
    const [rows] = await database.query<Rows>(sql, params);
    return rows;
  }

  async readColors(brandId: number, categoryId?: number) {
    let sql = `
      SELECT DISTINCT p.color
      FROM product p
      JOIN product_categories pc ON p.product_id = pc.product_id
      WHERE p.brand_id = ?
    `;
    const params: (string | number)[] = [brandId];

    if (categoryId) {
      sql += " AND pc.categorie_id = ?";
      params.push(categoryId);
    }

    sql += " ORDER BY p.color ASC";
    const [rows] = await database.query<Rows>(sql, params);
    return rows;
  }
}

export default new FilterBarRepository();
