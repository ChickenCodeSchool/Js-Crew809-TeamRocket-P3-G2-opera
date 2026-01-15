import "./CategorieProduct.css";
import { useNavigate } from "react-router";

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

function CategorieProduct({ products, brandId }: CategorieProductProps) {
  const navigate = useNavigate();
  const handleNavigation = (productId: number) => {
    navigate(`/brand/${brandId}/products/${productId}`);
  };

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.product_id} className="product-card">
          <div
            className="image-container"
            onClick={() => handleNavigation(product.product_id)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNavigation(product.product_id);
              }
            }}
          >
            <img
              src={`${import.meta.env.VITE_API_URL}${product.image_url}`}
              alt={product.name}
            />
          </div>
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
