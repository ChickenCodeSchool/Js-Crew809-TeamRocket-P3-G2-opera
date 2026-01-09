import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookmarkCard.css";

type MarkCard = {
  categorie_id: number;  
  image: string;
  categoryName: string;
};

type Props = {
  brandId: number;
};

export default function BookmarkCard({ brandId }: Props) {
  const [cards, setCards] = useState<MarkCard[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/brands/${brandId}/bookmark-cards`)
      .then((res) => res.json())
      .then((data: MarkCard[]) => setCards(data))
      .catch((err) => console.error(err));
  }, [brandId]);

  const handleClick = (categoryId: number) => {
    console.log("Navigation vers categoryId:", categoryId); // debug
    navigate(`/brand/${brandId}/category/${categoryId}`);
  };

  return (
    <section className="brand-cards-wrapper">
      {cards.map((card) => (
        <button
          key={card.categorie_id}  
          type="button"                
          className="bookmark-card"
          onClick={() => handleClick(card.categorie_id)} 
          style={{ cursor: "pointer" }}
        >
          <img
            src={`${import.meta.env.VITE_API_URL}${card.image}`}
            alt={card.categoryName}
            className="bookmark-card-image"
          />
          <h3 className="bookmark-card-title">{card.categoryName}</h3>
        </button>
      ))}
    </section>
  );
}
