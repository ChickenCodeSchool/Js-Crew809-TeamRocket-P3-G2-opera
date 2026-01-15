import HeroProduct from "../../components/HeroProduct/heroProduct";
import CarouselImgArticle from "../../components/carouselImgArticle/carouselImgArticle";
import DescriptionArticle from "../../components/descriptionArticle/descriptionArticle";
// import Suggestions from "../../components/suggestions/suggestions";
import "./articlePage.css";
import { useParams } from "react-router-dom";

function articlePage() {
  const { productId, brandId } = useParams();
  const SelectedProductId = productId
    ? Number.parseInt(productId, 10)
    : undefined;
  const SelectedBrandId = brandId ? Number.parseInt(brandId, 10) : undefined;

  return (
    <>
      <HeroProduct brandId={SelectedBrandId} />
      <div className="article-page">
        {SelectedProductId && (
          <>
            <CarouselImgArticle productId={SelectedProductId} />
            <DescriptionArticle productId={SelectedProductId} />
          </>
        )}
      </div>
      {/* <div className="suggestions-section">
        <Suggestions />
      </div> */}
    </>
  );
}

export default articlePage;
