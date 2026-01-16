import { useEffect, useState } from "react";
import "./heroProduct.css";
type MiniHero = {
  Brand_id: number;
  name: string;
  url_minihero: string;
};

type Props = {
  brandId: number | undefined;
};

const HeroProduct = ({ brandId }: Props) => {
  const [miniHero, setMiniHero] = useState<MiniHero[]>([]);
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    // AJOUTER CETTE SÉCURITÉ :
    if (!brandId || Number.isNaN(brandId)) {
      return;
    }

    fetch(
      `${import.meta.env.VITE_API_URL}/brands/${brandId}/mini-hero-categories`,
    )
      .then((response) => {
        if (!response.ok) throw new Error("Erreur serveur");
        return response.json();
      })
      .then((data) => {
        setMiniHero(data);
        setIsLoading(false);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [brandId]);

  return (
    <div className="header-categorie">
      {isloading ? (
        <p>Loading...</p>
      ) : (
        <>
          <img
            src={`${import.meta.env.VITE_API_URL}${miniHero[0]?.url_minihero}`}
            alt={`${miniHero[0]?.name} illustration de la marque`}
            className="header-categorie-image"
          />
        </>
      )}
    </div>
  );
};
export default HeroProduct;
