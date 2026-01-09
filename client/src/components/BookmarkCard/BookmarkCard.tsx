import { useEffect, useState } from "react";
import "./BookmarkCard.css";

type MarkCard = {
  id: number;
  image: string;
  categoryName: string;
};

type Props = {
  brandId: number;
};

export default function BookmarkCard({ brandId }: Props) {
  const [cards, setCards] = useState<MarkCard[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/brands/${brandId}/bookmark-cards`)
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, [brandId]);


  return (
    <section className="brand-cards-wrapper">
      {cards.map((card) => (
        <div key={card.id} className="bookmark-card">
          <img
            src={`${import.meta.env.VITE_API_URL}${card.image}`}
            alt={card.categoryName}
            className="bookmark-card-image"
          />
          <h3 className="bookmark-card-title">{card.categoryName}</h3>
        </div>
      ))}
    </section>
  );
}
