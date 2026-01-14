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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`)
      .then((response) => response.json())
      .then((data: ArticleDetails) => {
        setArticleData(data);
        // Définit l'image main par défaut à l'affichage
        const mainImg =
          data.images.find((img) => img.is_main) || data.images[0];
        setSelectedImage(mainImg?.url || null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur fetch:", error);
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) return <p className="status-msg">Chargement...</p>;
  if (!articleData || articleData.images.length === 0)
    return <p className="status-msg">Aucune image trouvée</p>;

  const baseUrl = import.meta.env.VITE_API_URL;

  return (
    <div className="product-carousel-container">
      <div className="main-image-wrapper">
        <img
          src={`${baseUrl}${selectedImage}`}
          alt={articleData.name}
          className="main-image"
        />
      </div>
      <div className="miniature-grid">
        {articleData.images.map((image) => (
          <button
            type="button"
            key={image.product_image_id}
            className={`miniature-button ${selectedImage === image.url ? "active" : ""}`}
            onClick={() => setSelectedImage(image.url)}
          >
            <img
              src={`${baseUrl}${image.url}`}
              alt={`Miniature ${image.product_image_id}`}
              className="miniature-img"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarouselImgArticle;

// import { useEffect, useState } from "react";
// import "./carouselImgArticle.css";

// type ArticleImage = {
//   product_image_id: string;
//   url: string;
//   is_main: boolean;
// };

// type ArticleDetails = {
//   product_id: number;
//   name: string;
//   description: string;
//   brand_id: number;
//   price: number;
//   color: string;
//   images: ArticleImage[];
// };

// type Props = {
//   productId: number;
// };

// const CarouselImgArticle = ({ productId }: Props) => {
//   const [articleData, setArticleData] = useState<ArticleDetails | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Data reçue du backend:", data);
//         setArticleData(data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Erreur fetch:", error);
//         setIsLoading(false);
//       });
//   }, [productId]);

//   return (
//     <div className="carousel-img-article">
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : articleData ? (
//         <div className="carousel-container">
//           {articleData.images.map((image) => (
//             <div key={image.product_image_id} className="carousel-item">
//               <img
//                 src={`${import.meta.env.VITE_API_URL}${image.url}`}
//                 alt={`${productId}`}
//                 className="carousel-image"
//               />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Aucune image trouvée</p>
//       )}
//     </div>
//   );
// };
// export default CarouselImgArticle;
