import databaseClient from "../../../database/client";

export type miniHero = {
  Brand_id: number;
  name: string;
  url_minihero: string;
};

class miniHeroCategorieRepository {
  async get(brandId: number): Promise<miniHero[]> {
    const query = `
        SELECT 
          Brand_id,
          name,
          url_minihero
        FROM brand
        WHERE Brand_id = ?
        `;
    const [rows] = await databaseClient.query(query, [brandId]);
    const result = rows as miniHero[];
    return result;
  }
}
export default new miniHeroCategorieRepository();
