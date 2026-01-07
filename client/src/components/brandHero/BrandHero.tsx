import type React from "react";
import "./BrandHero.css";

interface BrandHeroProps {
  brandName: string;
  backgroundImage: string;
}

const BrandHero: React.FC<BrandHeroProps> = ({
  brandName,
  backgroundImage,
}) => {
  return (
    <div className="brand-hero-container">
      {/* Couche 1 : L'image de fond qui remplit tout le bloc */}
      <div
        className="hero-image-bg"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Couche 2 : Le texte centré par-dessus */}
      <div className="hero-text-overlay">
        <h1 className="hero-brand-title">{brandName}</h1>
      </div>
    </div>
  );
};

export default BrandHero;
