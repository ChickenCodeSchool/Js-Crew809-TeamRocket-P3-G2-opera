import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";

export type ArticleDetails = {
  product_id: number;
  name: string;
  description: string;
  brand_id: number;
  price: number;
  color: string;
  images: ArticleDetailsImages[];
};
export type ArticleDetailsImages = {
  product_image_id: number;
  url: string;
  is_main: boolean;
};

//pour le mapping des résultats de la requête SQL sinon une seule image par produit serait retournée
type ProductRow = {
  product_id: number;
  name: string;
  description: string;
  brand_id: number;
  price: number;
  color: string;
  product_image_id: number;
  url: string;
  is_main: boolean;
};

type CreateArticle = {
  name: string;
  description: string;
  brand_id: number;
  price: number;
  color: string;
  gender: string;
  category_id: number;
};

class ArticleDetailsRepository {
  async get(productId: number): Promise<ArticleDetails | null> {
    const query = `
        SELECT 
          p.product_id,
          p.name,
          p.description,
          p.brand_id,
            p.price,
            p.color,
            pi.product_image_id,
            pi.url,
            pi.is_main
        FROM product p
        LEFT JOIN product_image pi ON p.product_id = pi.product_id
        WHERE p.product_id = ?
        `;
    const [rows] = await databaseClient.query(query, [productId]);
    const result = rows as ProductRow[];
    if (result.length === 0) {
      return null;
    }

    const firstRow = result[0];
    const productData: ArticleDetails = {
      product_id: firstRow.product_id,
      name: firstRow.name,
      description: firstRow.description,
      brand_id: firstRow.brand_id,
      price: firstRow.price,
      color: firstRow.color,
      images: result
        .filter((row) => row.product_image_id !== null)
        .map((row) => ({
          product_image_id: row.product_image_id,
          url: row.url as string,
          is_main: Boolean(row.is_main),
        })),
    };

    return productData;
  }
  async createproduct(data: CreateArticle): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      `
    INSERT INTO product (name, description, brand_id, price, color, gender)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        data.name,
        data.description,
        data.brand_id,
        data.price,
        data.color,
        data.gender,
      ],
    );

    const productId = result.insertId;

    await databaseClient.query(
      `
    INSERT INTO product_categories (product_id, categorie_id)
    VALUES (?, ?)
    `,
      [productId, data.category_id],
    );

    return productId;
  }
}

export default new ArticleDetailsRepository();
