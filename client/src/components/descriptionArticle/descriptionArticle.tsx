import { useEffect, useState, type KeyboardEvent } from "react";
import "./descriptionArticle.css";
import { MdFavorite } from "react-icons/md";

type ArticleDetails = {
  product_id: number;
  name: string;
  description: string;
  brand_id: number;
  price: number;
  color: string;
};

type Props = {
  productId: number;
};

function DescriptionArticle({ productId }: Props) {
  const [articleData, setArticleData] = useState<ArticleDetails | null>(null);
  const [isOpenSize, setIsOpenSize] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenColor, setIsOpenColor] = useState(false);
  const [isOpenComposition, setIsOpenComposition] = useState(false);
  const [isOpenDelivery, setIsOpenDelivery] = useState(false);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`)
      .then((response) => response.json())
      .then((data: ArticleDetails) => {
        setArticleData(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des détails:", error);
      });
  }, [productId]);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
    setIsOpenSize(!isOpenSize);
    setIsOpenColor(!isOpenColor);
    setIsOpenComposition(!isOpenComposition);
    setIsOpenDelivery(!isOpenDelivery);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // Empêche le scroll avec la barre espace
      toggleAnswer();
    }
  };

  // Sécurité : Si les données ne sont pas encore chargées, on affiche un message
  if (!articleData) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="article-container">
      <div className="articleheader">
        <span className="articlename">{articleData.name}</span>
        <div className="articleprice">€ {Math.floor(articleData.price)}</div>
      </div>
      {/* ONGLET TAILLES */}
      <div
        className="size-header"
        onClick={() => setIsOpenSize(!isOpenSize)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpenSize}
      >
        Taille
        <span className="toggle-icon">{isOpenSize ? "−" : "+"}</span>
      </div>

      {isOpenSize && (
        <div className="size-options">
          <span className="size">34</span>
          <span className="size">36</span>
          <span className="size">38</span>
          <span className="size">40</span>
        </div>
      )}

      {/* ONGLET COULEURS */}
      <div
        className="color-header"
        onClick={() => setIsOpenColor(!isOpenColor)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpenColor}
      >
        Couleurs
        <span className="toggle-icon">{isOpenColor ? "−" : "+"}</span>
      </div>
      {isOpenColor && (
        <span className="color-options">{articleData.color}</span>
      )}

      <div className="detail-content">
        <div className="description-header">Description</div>
        <p className="description-content">{articleData.description}</p>
      </div>
      {/* ONGLET COMPOSITION */}
      <div
        className="composition-header"
        onClick={() => setIsOpenComposition(!isOpenComposition)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpenComposition}
      >
        Composition et entretien
        <span className="toggle-icon">{isOpenComposition ? "−" : "+"}</span>
      </div>

      {isOpenComposition && (
        <div className="composition-options">
          <p>Composition : 100% coton</p>
          <p>Entretien : Lavage à 30°C</p>
        </div>
      )}

      {/* ONGLET LIVRAISON */}
      <div
        className="delivery-header"
        onClick={() => setIsOpenDelivery(!isOpenDelivery)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpenDelivery}
      >
        Livraison
        <span className="toggle-icon">{isOpenDelivery ? "−" : "+"}</span>
      </div>

      {isOpenDelivery && (
        <div className="delivery-options">
          <p>Livraison gratuite à partir de 1000 € d'achat</p>
          <p>Retours gratuits sous 30 jours</p>
        </div>
      )}

      <div className="button-favorite">
        <button type="button" className="add-to-cart-button">
          Ajouter au panier
        </button>
        <span className="favorite-button">
          <MdFavorite />
        </span>
      </div>
    </div>
  );
}

export default DescriptionArticle;
