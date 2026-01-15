import databaseClient from "../../../database/client";

type BookmarkCard = {
  image: string | null;     
  categoryName: string;
  categorie_id: number;
};

type CategoryRow = {
  categorie_id: number;
  categoryName: string;
};

type ImageRow = {
  categorie_id: number;
  url: string;
};

class BookmarkRepository {
  async getBookbrand(brandId: number): Promise<BookmarkCard[]> {
    const queryCategories = `
      SELECT 
        cat.categorie_id,
        cat.name AS categoryName
      FROM categories cat
      JOIN product_categories pc ON pc.categorie_id = cat.categorie_id
      JOIN product p ON p.product_id = pc.product_id
      WHERE p.brand_id = ?
      GROUP BY cat.categorie_id, cat.name
      ORDER BY cat.categorie_id ASC
      LIMIT 4
    `;
    const [categoriesRowsRaw] = await databaseClient.query(queryCategories, [brandId]);
    const categories: CategoryRow[] = categoriesRowsRaw as CategoryRow[];

    if (categories.length === 0) return [];

    const categoryIds = categories.map(c => c.categorie_id);
    const placeholders = categoryIds.map(() => "?").join(",");
    const queryImages = `
      SELECT pc2.categorie_id, pi.url
      FROM product_image pi
      JOIN product p2 ON p2.product_id = pi.product_id
      JOIN product_categories pc2 ON pc2.product_id = p2.product_id
      WHERE pi.is_main = 1
        AND p2.brand_id = ?
        AND pc2.categorie_id IN (${placeholders})
      ORDER BY pi.product_image_id ASC
    `;
    const [imagesRowsRaw] = await databaseClient.query(queryImages, [brandId, ...categoryIds]);
    const images: ImageRow[] = imagesRowsRaw as ImageRow[];

    const cards: BookmarkCard[] = categories.map(cat => {
      const img = images.find(i => i.categorie_id === cat.categorie_id);
      return {
        categorie_id: cat.categorie_id,
        categoryName: cat.categoryName,
        image: img ? img.url : null,
      };
    });

    return cards;
  }
}

export default new BookmarkRepository();
