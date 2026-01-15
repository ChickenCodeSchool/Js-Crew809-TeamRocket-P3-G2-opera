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

function CategorieProduct({ products }: CategorieProductProps) {
  if (!products || products.length === 0) {
    return (
      <div className="no-products-message">
        Aucun produit ne correspond à votre recherche.
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.product_id} className="product-card">
          <div className="image-container">
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
