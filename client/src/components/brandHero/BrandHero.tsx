import { useEffect, useState } from "react";

import "./BrandHero.css";

type Hero = {
  Brand_id: number;
  name: string;
  url_minihero: string;
  url_hero: string;
};

type Props = {
  brandId: number;
};

const BrandHero = ({ brandId }: Props) => {
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/brands/${brandId}/hero`)
      .then((response) => response.json())
      .then((data) => {
        setHero(data);
      });
  }, [brandId]);
  return (
    <div className="brand-hero-container">
      {/* Couche 1 : L'image de fond qui remplit tout le bloc */}
      <div
        className="hero-image-bg"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_API_URL}${hero?.url_hero})`,
        }}
      />

      {/* Couche 2 : Le texte centré par-dessus */}
      <div className="hero-text-overlay">
        <h1 className="hero-brand-title">{hero?.name}</h1>
      </div>
    </div>
  );
};

export default BrandHero;
