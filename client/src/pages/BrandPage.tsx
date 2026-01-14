import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BrandPage.css";
import BookmarkCard from "../components/BookmarkCard/BookmarkCard";
import BrandDescription from "../components/brandDescription/BrandDescription";
import BrandHero from "../components/brandHero/BrandHero";

export default function BrandPage() {
  const { id } = useParams();
  const brandId = Number(id);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    navbar?.classList.add("brand-page__navbar-static");
    return () => {
      navbar?.classList.remove("brand-page__navbar-static");
    };
  }, []);

  return (
    <div className="brand-page">
      <BrandHero brandId={brandId} />
      <BrandDescription brandId={brandId} />
      <BookmarkCard brandId={brandId} />
    </div>
  );
}
