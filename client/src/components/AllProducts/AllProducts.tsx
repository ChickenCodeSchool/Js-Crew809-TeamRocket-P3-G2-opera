import { useNavigate } from "react-router-dom";
import "./AllProducts.css";

export type GlobalProduct = {
  product_id: number;
  name: string;
  price: number;
  image_url: string;
  brand_id: number;
};

type AllProductsProps = {
  products: GlobalProduct[];
};

function AllProducts({ products }: AllProductsProps) {
  const navigate = useNavigate();

  const handleNavigation = (product: GlobalProduct) => {
    navigate(`/brand/${product.brand_id}/products/${product.product_id}`);
  };

  if (!Array.isArray(products) || products.length === 0) {
    return <div className="no-products-AllProduct">Aucun produit trouvé.</div>;
  }

  return (
    <div className="grid-AllProduct">
      {products.map((product, index) => (
        <div
          key={product.product_id}
          className="card-AllProduct"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <button
            type="button"
            className="image-container-AllProduct"
            onClick={() => handleNavigation(product)}
          >
            <img
              src={`${import.meta.env.VITE_API_URL}${product.image_url}`}
              alt={product.name}
            />
          </button>
          <p className="name-AllProduct">{product.name}</p>
          <p className="price-AllProduct">
            {new Intl.NumberFormat("fr-FR").format(product.price)} €
          </p>
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
