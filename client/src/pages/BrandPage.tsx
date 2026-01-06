import { useState, useEffect } from "react";
import "./BrandPage.css"
import BookmarkCard from "../components/BookmarkCard/BookmarkCard";
import chanelbag from "../assets/images/testcards/chanel19_3.jpg";
import chanelhabit from "../assets/images/testcards/chanel29_3.jpg";
import chanelshoes from '../assets/images/testcards/chanel47_1.jpg';
import chanelbijoux from '../assets/images/testcards/chanel74_2.jpg';


type BookmarkCardType = {
  image: string;
  categoryName: string;
};

export default function BrandPage() {
  const [cards, setCards] = useState<BookmarkCardType[]>([]);

  useEffect(() => {
    const testData: BookmarkCardType[] = [
      { image: chanelbag, categoryName: "Sacs" },
      { image: chanelhabit, categoryName: "Prêt à porter" },
      { image: chanelshoes, categoryName: "Chaussures" },
      { image: chanelbijoux, categoryName: "Accessoires" },
    ];
    setCards(testData);
  }, []);

  return (
    <div className="brand-page">
      <div className="brand-cards-wrapper">
        {cards.map((card, index) => (
          <BookmarkCard
            key={index}
            image={card.image}
            categoryName={card.categoryName}
          />
        ))}
      </div>
       <div className="brand-cards-wrapper">
        {cards.map((card, index) => (
          <BookmarkCard
            key={index}
            image={card.image}
            categoryName={card.categoryName}
          />
        ))}
      </div>
    </div>
  );
}
