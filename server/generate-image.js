const fs = require("fs");
const path = require("path");

const brandsDir = "./public/assets/images/landingImage";

const brandIds = {
  rolex: 1,
  hermes: 2,
  chanel: 3,
  cartier: 4,
  guerlain: 5,
  ysl: 6,
  dior: 7,
  prada: 8,
  louisvuitton: 9,
  gucci: 10,
};

let inserts = [];

const brands = fs.readdirSync(brandsDir);

brands.forEach((brand) => {
  const brandPath = path.join(brandsDir, brand);
  if (fs.statSync(brandPath).isDirectory() && brandIds[brand]) {
    const images = fs.readdirSync(brandPath);
    images.forEach((img) => {
      const isMain = img.toLowerCase().includes("main") ? 1 : 0;
      const type = img.toLowerCase().includes("main") ? "main" : "slide";
      inserts.push(
        `(${brandIds[brand]}, '/assets/images/landingImage/${brand}/${img}', ${isMain}, '${type}')`
      );
    });
  }
});

const sql = `INSERT INTO brand_picture (brand_id, url, is_main, type) VALUES \n${inserts.join(
  ",\n"
)};`;

fs.writeFileSync("brand_pictures.sql", sql);
console.log(
  "✅ Fichier brand_pictures.sql généré avec",
  inserts.length,
  "images !"
);
