import { useEffect, useState } from "react";
import "./headerCategorie.css";

type MiniHero = {
  Brand_id: number;
  name: string;
  url_minihero: string;
};

type Props = {
  brandId: number;
};

const HeaderCategorie = ({ brandId }: Props) => {
  const [miniHero, setMiniHero] = useState<MiniHero[]>([]);
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/brands/${brandId}/mini-hero-categories`,
    )
      .then((response) => response.json())
      .then((data) => {
        setMiniHero(data);
        setIsLoading(false);
      });
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
          {/* <div className="header-categorie-brandname">{miniHero[0]?.name}</div>
          <hr /> */}
        </>
      )}
    </div>
  );
};
export default HeaderCategorie;
