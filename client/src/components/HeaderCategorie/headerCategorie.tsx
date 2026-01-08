import { useEffect, useState } from "react";
import "./headerCategorie.css";

type MiniHero = {
  Brand_id: number;
  name: string;
  url_hero: string;
};

const HeaderCategorie = () => {
  const [miniHero, setMiniHero] = useState<MiniHero | null>(null);
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/brands/:brandId/mini-hero-categories`,
    )
      .then((response) => response.json())
      .then((data) => setMiniHero(data));
  }, []);

  return (
    <div className="header-categorie">
      <img
        src={miniHero?.url_hero}
        alt={miniHero?.name}
        className="header-categorie-image"
      />
    </div>
  );
};
export default HeaderCategorie;
