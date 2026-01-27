import fs from "node:fs";
import path from "node:path";
import multer from "multer";

// Créer le dossier s'il n'existe pas
const uploadDir = "public/uploads/products";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback): void => {
    callback(null, uploadDir);
  },

  filename: (_req, file, callback): void => {
    const extension = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}${extension}`;

    callback(null, filename);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
