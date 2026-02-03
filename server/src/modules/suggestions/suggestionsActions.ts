import type { RequestHandler } from "express";
import DatabaseClient from "../../../database/client";
import type {
  CurrentProduct,
  DatabaseQueryResult,
  SuggestionProduct,
} from "./suggestions.types";

const getSuggestions: RequestHandler = async (req, res, next) => {
  const productId = Number(req.params.productId);

  if (!productId || Number.isNaN(productId)) {
    res.status(400).json({ error: "Valid Product ID is required" });
    return;
  }

  try {
    // Récupérer les informations du produit actuel
    const [currentProductRows] = (await DatabaseClient.query(
      `SELECT brand_id, color, GROUP_CONCAT(DISTINCT pc.categorie_id) as category_ids
       FROM product p
       LEFT JOIN product_categories pc ON p.product_id = pc.product_id
       WHERE p.product_id = ?
       GROUP BY p.product_id`,
      [productId],
    )) as DatabaseQueryResult<CurrentProduct>;

    if (!currentProductRows || currentProductRows.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const { brand_id, color, category_ids } = currentProductRows[0];
    const currentCategories = category_ids ? category_ids.split(",") : [];
    const firstCategory = currentCategories[0] || "";

    // Récupérer les suggestions
    const [suggestions] = (await DatabaseClient.query(
      `SELECT 
        p.product_id,
        p.name,
        p.price,
        p.color,
        MAX(pi.url) as image_url,
        GROUP_CONCAT(DISTINCT pc.categorie_id) as product_categories
      FROM product p
      LEFT JOIN product_image pi ON p.product_id = pi.product_id AND pi.is_main = 1
      LEFT JOIN product_categories pc ON p.product_id = pc.product_id
      WHERE p.brand_id = ?
        AND p.product_id != ?
      GROUP BY p.product_id, p.name, p.price, p.color
      HAVING (
        (p.color = ? AND NOT FIND_IN_SET(?, product_categories))
        OR (p.color = ?)
        OR (NOT FIND_IN_SET(?, product_categories))
      )
      ORDER BY
        (p.color = ? AND NOT FIND_IN_SET(?, product_categories)) DESC,
        (p.color = ?) DESC,
        RAND()
      LIMIT 3`,
      [
        brand_id,
        productId,
        color,
        firstCategory,
        color,
        firstCategory,
        color,
        firstCategory,
        color,
      ],
    )) as DatabaseQueryResult<SuggestionProduct>;

    res.json(suggestions);
  } catch (error) {
    next(error);
  }
};

export default { getSuggestions };
