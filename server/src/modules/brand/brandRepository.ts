import databaseClient from "../../../database/client";
export type brandHero = {
  Brand_id: number;
  name: string;
  url_minihero: string;
  url_hero: string;
};

class brandRepository {
  async getOne(brandId: number): Promise<brandHero[]> {
    const query = `
        SELECT 
          Brand_id,
          name,
          url_minihero, 
          url_hero
        FROM brand
        WHERE Brand_id = ?
        `;
    const [rows] = await databaseClient.query(query, [brandId]);
    const result = rows as brandHero[];
    return result;
  }
}
export default new brandRepository();
