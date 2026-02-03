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
  sizes: ArticleSize[];
};

export type ArticleSize = {
  size_id: number;
  size_label: string;
  stock_id: number;
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
  size_id: number | null;
  size_label: string | null;
  stock_id: number | null;
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
          pi.is_main,
          s.size_id,
          s.size_label,
          s.stock_id
        FROM product p
        LEFT JOIN product_image pi ON p.product_id = pi.product_id
        LEFT JOIN size s ON p.product_id = s.product_id
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
        .filter(
          (
            row,
          ): row is ProductRow & {
            product_image_id: number;
            url: string;
            is_main: boolean;
          } =>
            row.product_image_id !== null &&
            row.url !== null &&
            row.is_main !== null,
        )
        .reduce((acc: ArticleDetailsImages[], row) => {
          if (
            !acc.find((img) => img.product_image_id === row.product_image_id)
          ) {
            acc.push({
              product_image_id: row.product_image_id,
              url: row.url,
              is_main: Boolean(row.is_main),
            });
          }
          return acc;
        }, []),

      sizes: result
        .filter(
          (
            row,
          ): row is ProductRow & {
            size_id: number;
            size_label: string;
            stock_id: number;
          } =>
            row.size_id !== null &&
            row.size_label !== null &&
            row.stock_id !== null,
        )
        .reduce((acc: ArticleSize[], row) => {
          // Éviter les doublons
          if (!acc.find((s) => s.size_id === row.size_id)) {
            acc.push({
              size_id: row.size_id,
              size_label: row.size_label,
              stock_id: row.stock_id,
            });
          }
          return acc;
        }, [])
        .sort((a, b) => {
          // Tri numérique des tailles
          const aNum = Number.parseInt(a.size_label);
          const bNum = Number.parseInt(b.size_label);
          if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
            return aNum - bNum;
          }
          return a.size_label.localeCompare(b.size_label);
        }),
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
