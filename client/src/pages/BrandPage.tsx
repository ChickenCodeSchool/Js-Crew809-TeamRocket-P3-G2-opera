import { useEffect, useState } from "react";
import "./BrandPage.css";
import chanelbag from "../assets/images/testcards/chanel19_3.jpg";
import chanelhabit from "../assets/images/testcards/chanel29_3.jpg";
import chanelshoes from "../assets/images/testcards/chanel47_1.jpg";
import chanelbijoux from "../assets/images/testcards/chanel74_2.jpg";
import BookmarkCard from "../components/BookmarkCard/BookmarkCard";

type BookmarkCardType = {
  id: number;
  image: string;
  categoryName: string;
};

export default function BrandPage() {
  const [cards, setCards] = useState<BookmarkCardType[]>([]);

  useEffect(() => {
    const testData: BookmarkCardType[] = [
      { id: 1, image: chanelbag, categoryName: "Sacs" },
      { id: 2, image: chanelhabit, categoryName: "Prêt à porter" },
      { id: 3, image: chanelshoes, categoryName: "Chaussures" },
      { id: 4, image: chanelbijoux, categoryName: "Accessoires" },
    ];
    setCards(testData);
  }, []);

  return (
    <div className="brand-page">
      <div className="brand-cards-wrapper">
        {cards.map((card) => (
          <BookmarkCard
            key={card.id}
            image={card.image}
            categoryName={card.categoryName}
          />
        ))}
      </div>
    </div>
  );
}
