import HeroProduct from "../../components/HeroProduct/heroProduct";
import CarouselImgArticle from "../../components/carouselImgArticle/carouselImgArticle";
import DescriptionArticle from "../../components/descriptionArticle/descriptionArticle";
// import Suggestions from "../../components/suggestions/suggestions";
import "./articlePage.css";

function articlePage() {
  return (
    <>
      <HeroProduct brandId={7} />
      <div className="article-page">
        <CarouselImgArticle productId={123} />
        <DescriptionArticle productId={123} />
      </div>
      {/* <div className="suggestions-section">
        <Suggestions />
      </div> */}
    </>
  );
}

export default articlePage;
