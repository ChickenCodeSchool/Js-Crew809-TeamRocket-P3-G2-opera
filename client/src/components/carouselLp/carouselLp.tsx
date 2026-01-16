import { useEffect, useState } from "react";
import "./CarouselLp.css";
import { useNavigate } from "react-router";

type CarouselBrandPicture = {
  brand_picture_id: number;
  brand_id: number;
  url: string;
  is_main: number;
  type: string;
  brand_name: string;
};

const CarouselLp: React.FC = () => {
  const [carouselBrandPictureData, setCarouselBrandPictureData] = useState<
    CarouselBrandPicture[]
  >([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/carouselLp`)
      .then((response) => response.json())
      .then((data: CarouselBrandPicture[]) => {
        setCarouselBrandPictureData(data);
      });
  }, []);

  const handleMouseEnter = (i: number) => {
    if (window.matchMedia("(hover:hover)").matches) {
      setActiveIndex(i);
    }
  };

  const handleClick = (i: number) => {
    setActiveIndex(i);
  };

  const handleNavigation = (brandId: number) => {
    navigate(`/brand/${brandId}`);
  };

  return (
    <section>
      <div className="sliderLp">
        <div className="track">
          {carouselBrandPictureData.map((card, index) => (
            <article
              key={card.brand_picture_id}
              className="project-card"
              onClickCapture={() => handleNavigation(card.brand_id)}
              data-active={activeIndex === index}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={() => handleClick(index)}
              onKeyDown={() => {}}
            >
              <img
                className="project-card__bg"
                src={`${import.meta.env.VITE_API_URL}${card.url}`}
                alt={card.brand_name}
              />
              <div className="project-card__content">
                <div>
                  <h3 className="project-card__title">
                    {card.brand_name.toUpperCase()}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselLp;
