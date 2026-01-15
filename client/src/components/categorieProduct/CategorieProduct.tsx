import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CategorieProduct.css";

export type Product = {
  product_id: number;
  name: string;
  price: number;
  image_url: string;
};

type CategorieProductProps = {
  products: Product[];
  brandId?: number;
  categoryId?: number;
  name?: string;
};

function CategorieProduct({ brandId, categoryId }: CategorieProductProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/brands/${brandId}/categories/${categoryId}/products`,
    )
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Erreur chargement produits:", err));
  }, [brandId, categoryId]);

  const handleNavigation = (productId: number) => {
    navigate(`/brand/${brandId}/products/${productId}`);
  };

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div
          key={product.product_id}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleNavigation(product.product_id);
            }
          }}
          className="product-card"
          style={{ cursor: "pointer" }}
          onClick={() => handleNavigation(product.product_id)}
        >
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
