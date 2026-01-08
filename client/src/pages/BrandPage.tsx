import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BrandPage.css";

// import BrandDescription from "../components/brandDescription/BrandDescription";
// import BookmarkCard from "../components/BookmarkCard/BookmarkCard";
import HeaderCategorie from "../components/HeaderCategorie/headerCategorie";

export default function BrandPage() {
  const { id } = useParams();
  const brandId = Number(id);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    navbar?.classList.add("brand-pagenavbar-static");
    return () => {
      navbar?.classList.remove("brand-pagenavbar-static");
    };
  }, []);

  return (
    <div className="brand-page">
      <HeaderCategorie brandId={brandId} />
      {/* <BrandDescription brandId={brandId} />
      <BookmarkCard brandId={brandId} /> */}
    </div>
  );
}
