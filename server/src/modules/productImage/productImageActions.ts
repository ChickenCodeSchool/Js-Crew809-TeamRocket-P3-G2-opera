import type { Request, Response } from "express";
import productImageRepository from "./productImageRepository";

const addImages = async (req: Request, res: Response): Promise<void> => {
  console.log("📸 Requête reçue pour upload images");
  console.log("Product ID:", req.params.productId);
  console.log("Files reçus:", req.files);
  console.log("Body:", req.body);

  const productId = Number(req.params.productId);

  if (!req.files || !Array.isArray(req.files)) {
    console.error("❌ Aucune image reçue");
    res.status(400).json({ error: "Aucune image reçue" });
    return;
  }

  try {
    const files = req.files as Express.Multer.File[];
    const isMainFlags = req.body.isMain; // Array de "0" ou "1"

    console.log(`✅ ${files.length} fichier(s) à uploader`);
    console.log("🏷️ Flags isMain:", isMainFlags);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Gérer le cas où isMainFlags est un array ou une seule valeur
      const isMain = Array.isArray(isMainFlags)
        ? isMainFlags[i] === "1"
        : isMainFlags === "1";

      console.log(`Image ${i + 1}: ${file.filename}, isMain: ${isMain}`);

      await productImageRepository.insert({
        productId,
        url: `/uploads/products/${file.filename}`,
        isMain, // ✅ Utiliser le flag envoyé depuis le frontend
      });
    }

    console.log("🎉 Images ajoutées avec succès");
    res.status(201).json({
      message: "Images ajoutées",
      count: files.length,
    });
  } catch (error) {
    console.error("❌ Erreur complète:", error);
    res.status(500).json({
      error: "Erreur serveur",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default { addImages };
