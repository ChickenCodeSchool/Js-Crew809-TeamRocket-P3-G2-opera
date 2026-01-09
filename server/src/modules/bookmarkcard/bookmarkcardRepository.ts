import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type BookmarkCard = {
  image: string;
  categoryName: string;
  categorie_id: number;
};

class BookmarkRepository {
  async getBookbrand(brandId: number): Promise<BookmarkCard[]> {
    const query = `
      SELECT 
      cat.categorie_id,
      cat.name AS categoryName,
      (SELECT pi.url
       FROM product_image pi
       JOIN product p2 ON p2.product_id = pi.product_id
       JOIN product_categories pc2 ON pc2.product_id = p2.product_id
       WHERE pc2.categorie_id = cat.categorie_id
       AND pi.is_main = 1
       ORDER BY pi.product_image_id ASC
       LIMIT 1) AS image
      FROM categories cat
      JOIN product_categories pc ON pc.categorie_id = cat.categorie_id
      JOIN product p ON p.product_id = pc.product_id
      WHERE p.brand_id = ?
      GROUP BY cat.categorie_id, cat.name
      ORDER BY cat.categorie_id ASC
      LIMIT 4
    `;
    const [rows] = await databaseClient.query(query, [brandId]);
    return rows as BookmarkCard[];
  }
}
export default new BookmarkRepository();
