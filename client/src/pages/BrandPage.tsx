import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./BrandPage.css";

/*import HeaderCategorie from "../components/HeaderCategorie/headerCategorie";*/
import BrandDescription from "../components/brandDescription/BrandDescription";
import BookmarkCard from "../components/BookmarkCard/BookmarkCard";

export default function BrandPage() {
  const { id } = useParams();
  const brandId = Number(id);

useEffect(() => {
  const navbar = document.querySelector(".navbar");
  navbar?.classList.add("brand-page__navbar-static");
  return () => {navbar?.classList.remove("brand-page__navbar-static");
  };
}, []);

  return (
    <div className="brand-page">
      {/*<HeaderCategorie brandId={brandId} />*/}
      <BrandDescription brandId={brandId} />
      <BookmarkCard brandId={brandId} />
    </div>
  );
}
