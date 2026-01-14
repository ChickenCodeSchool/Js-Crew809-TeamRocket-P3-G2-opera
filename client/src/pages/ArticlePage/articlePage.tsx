import CarouselImgArticle from "../../components/carouselImgArticle/carouselImgArticle";
import DescriptionArticle from "../../components/descriptionArticle/descriptionArticle";
import HeroProduct from "../../components/HeroProduct/heroProduct";
import "./articlePage.css";

function articlePage() {
  return (
    <>
      <HeroProduct brandId={7} />
      <div className="article-page">
        <CarouselImgArticle productId={123} />
        <DescriptionArticle productId={123} />
      </div>
    </>
  );
}

export default articlePage;
