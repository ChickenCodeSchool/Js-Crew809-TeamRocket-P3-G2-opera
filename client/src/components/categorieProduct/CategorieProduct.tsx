import { useEffect, useState } from "react";
import "./CategorieProduct.css";

type Product = {
  product_id: number;
  name: string;
  price: number;
  image_url: string;
};

type CategorieProductProps = {
  brandId: number;
  categoryId: number;
  name: string;
};

function CategorieProduct({ brandId, categoryId }: CategorieProductProps) {
  const [products, setProducts] = useState<Product[]>([]);
  console.log("brandId:", brandId, "categoryId:", categoryId);

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/brands/${brandId}/categories/${categoryId}/products`,
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [brandId, categoryId]);

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.product_id} className="product-card">
          <img
            src={`${import.meta.env.VITE_API_URL}${product.image_url}`}
            alt={product.name}
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">
            {new Intl.NumberFormat("fr-FR").format(product.price)} €
          </p>
        </div>
      ))}
    </div>
  );
}

export default CategorieProduct;
