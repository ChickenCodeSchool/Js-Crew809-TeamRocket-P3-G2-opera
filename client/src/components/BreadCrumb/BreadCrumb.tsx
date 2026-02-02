import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BreadCrumb.css";

type ProductDetails = {
  product_id: number;
  name: string;
  brand_id: number;
  brand_name?: string;
};

type Props = {
  productId?: number;
};

function Breadcrumb({ productId }: Props) {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [brandName, setBrandName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!productId) {
        setIsLoading(false);
        return;
      }

      try {
        // Récupération du produit
        const productResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/products/${productId}`,
        );

        if (!productResponse.ok) {
          throw new Error(`Erreur ${productResponse.status}`);
        }

        const productData: ProductDetails = await productResponse.json();
        setProduct(productData);

        if (productData.brand_name) {
          setBrandName(productData.brand_name);
        }

        if (productData.brand_id && !productData.brand_name) {
          try {
            const brandResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/api/brands/${productData.brand_id}`,
            );
            if (brandResponse.ok) {
              const brandData = await brandResponse.json();
              setBrandName(brandData.name || brandData.brand_name || "");
            }
          } catch (error) {
            console.log("Impossible de récupérer le nom de la marque");
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (isLoading || !product) {
    return null;
  }

  return (
    <div className="breadcrumb" aria-label="Fil d'Ariane">
      <div className="breadcrumb-list">
        <div className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">
            Accueil
          </Link>
        </div>

        {product.brand_id && (
          <>
            <span className="breadcrumb-separator" aria-hidden="true">
              -
            </span>
            <div className="breadcrumb-item">
              <Link
                to={`/brand/${product.brand_id}`}
                className="breadcrumb-link"
              >
                {brandName}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Breadcrumb;
