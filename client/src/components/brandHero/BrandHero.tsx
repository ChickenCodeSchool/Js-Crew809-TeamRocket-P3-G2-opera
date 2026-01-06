import type React from "react";
import "./BrandHero.css";

// Interface pour définir tes props (comme dans CollectionLp.tsx)
interface BrandHeroProps {
  brandName: string;
  slogan?: string;
  backgroundImage: string;
  logoUrl?: string;
}

// Utilisation de React.FC (comme dans CarouselLp.tsx)
const BrandHero: React.FC<BrandHeroProps> = ({
  brandName,
  slogan,
  backgroundImage,
  logoUrl,
}) => {
  return (
    <section className="brand-hero">
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            {logoUrl && (
              <img
                src={logoUrl}
                alt={`${brandName} logo`}
                className="hero-logo"
              />
            )}
            <h1 className="hero-title">{brandName}</h1>
            {slogan && <p className="hero-subtitle">{slogan}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandHero;
