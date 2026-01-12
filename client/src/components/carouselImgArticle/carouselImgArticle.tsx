// import { useEffect, useState } from "react";
// import "./carouselImgArticle.css";

// type ArticleImage = {
//   product_image_id: string;
//   url: string;
//   is_main: boolean;
// };

// type Props = {
//   productId: number;
//   name?: string;
//   description?: string;
//   brand_id?: number;
//   price?: number;
//   color?: string;
// };

// const CarouselImgArticle = ({ productId }: Props) => {
//   const [articleImages, setArticleImages] = useState<ArticleImage[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setArticleImages(data);
//         setIsLoading(false);
//       });
//   }, [productId]);

//   return (
//     <div className="carousel-img-article">
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="carousel-container">
//           {articleImages.map((image) => (
//             <div key={image.product_image_id} className="carousel-item">
//               <img
//                 src={`${import.meta.env.VITE_API_URL}${image.url}`}
//                 alt={`${productId}`}
//                 className="carousel-image"
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarouselImgArticle;
import { useEffect, useState } from "react";
import "./carouselImgArticle.css";

type ArticleImage = {
  product_image_id: string;
  url: string;
  is_main: boolean;
};

type ArticleDetails = {
  product_id: number;
  name: string;
  description: string;
  brand_id: number;
  price: number;
  color: string;
  images: ArticleImage[];
};

type Props = {
  productId: number;
};

const CarouselImgArticle = ({ productId }: Props) => {
  const [articleData, setArticleData] = useState<ArticleDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data reçue du backend:", data); // ← Ajoute ce log
        setArticleData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur fetch:", error);
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <div className="carousel-img-article">
      {isLoading ? (
        <p>Loading...</p>
      ) : articleData ? (
        <div className="carousel-container">
          {articleData.images.map((image) => (
            <div key={image.product_image_id} className="carousel-item">
              <img
                src={`${import.meta.env.VITE_API_URL}${image.url}`}
                alt={`${productId}`}
                className="carousel-image"
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Aucune image trouvée</p>
      )}
    </div>
  );
};
export default CarouselImgArticle;
