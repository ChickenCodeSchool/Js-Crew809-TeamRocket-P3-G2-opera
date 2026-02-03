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
  isVisible?: boolean;
};

export default function BookmarkCard({ brandId, isVisible = false }: Props) {
  const [cards, setCards] = useState<MarkCard[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/brands/${brandId}/bookmark-cards`)
      .then((res) => res.json())
      .then((data: MarkCard[]) => setCards(data));
  }, [brandId]);

  const handleClick = (categoryId: number) => {
    navigate(`/brand/${brandId}/category/${categoryId}`);
  };

  return (
    <section className="brand-cards-wrapper">
      {cards.map((card, index) => (
        <button
          key={card.categorie_id}
          type="button"
          className={`bookmark-card ${isVisible ? "visible" : ""}`}
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => handleClick(card.categorie_id)}
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
