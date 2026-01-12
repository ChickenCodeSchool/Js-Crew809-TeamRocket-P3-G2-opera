import database from "../../../database/client";
import type { Rows } from "../../../database/client";

class FilterBarRepository {
  async readFiltered(
    brandId: number,
    categoryId?: number,
    color?: string,
    size?: string,
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

    const [rows] = await database.query<Rows>(sql, params);
    return rows;
  }

  async readAllCategories() {
    const [rows] = await database.query<Rows>(
      "SELECT categorie_id AS id, name FROM categories",
    );
    return rows;
  }

  async readAllBrands() {
    const [rows] = await database.query<Rows>(
      "SELECT brand_id AS id, name FROM brand ORDER BY name ASC",
    );
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
}

export default new FilterBarRepository();
