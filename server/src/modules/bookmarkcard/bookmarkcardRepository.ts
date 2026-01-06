import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type BookmarkCard= {
    image: string;
    categoryName : string,
}

class BookmarkRepository {
    async getBookbrand(brandId: number): Promise<BookmarkCard[]> {
        const query=`
        SELECT 
        c.name AS categoryName,
        bp.url AS image
        FROM product p
        JOIN product_categories pc ON pc.product_id = p.product_id
        JOIN categories c ON c.categorie_id = pc.categorie_id
        JOIN brand_picture bp ON bp.brand_id = p.brand_id
        WHERE p.brand_id = ?  
        AND bp.is_main = 1
        AND bp.type = 'collection'
        GROUP BY c.categorie_id
        ORDER BY c.categorie_id ASC 
        LIMIT 4
        `;
        const [rows] = await databaseClient.query(query,  [brandId]);
        return rows as BookmarkCard[];
    }
}
export default new BookmarkRepository();