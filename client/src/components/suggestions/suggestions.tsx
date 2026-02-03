import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../components/categorieProduct/CategorieProduct";
import "./suggestions.css";

interface SuggestionsProps {
  productId: number;
  brandId?: number;
}

function Suggestions({ productId, brandId }: SuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/${productId}/suggestions`,
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [productId]);

  const handleNavigation = (suggestionId: number) => {
    if (brandId) {
      navigate(`/brand/${brandId}/products/${suggestionId}`);
    } else {
      window.location.reload(); // Si pas de brandId, recharger la page
    }
  };

  if (loading) {
    return <div className="suggestions-loading">Chargement...</div>;
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="suggestions-container">
      <h2 className="suggestions-title">Vous aimerez aussi</h2>
      <div className="suggestions-grid">
        {suggestions.map((product) => (
          <div
            key={product.product_id}
            className="suggestion-card"
            onClick={() => handleNavigation(product.product_id)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNavigation(product.product_id);
              }
            }}
          >
            <div className="suggestion-image-container">
              <img
                src={`${import.meta.env.VITE_API_URL}${product.image_url}`}
                alt={product.name}
                className="suggestion-image"
              />
            </div>
            <div className="suggestion-article-details">
              <span className="suggestion-name">{product.name}</span>
              <span className="suggestion-price">
                {new Intl.NumberFormat("fr-FR").format(product.price)} €
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
