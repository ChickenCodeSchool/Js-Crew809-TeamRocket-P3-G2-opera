// import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BrandPage.css";
import BookmarkCard from "../components/BookmarkCard/BookmarkCard";
import BrandDescription from "../components/brandDescription/BrandDescription";
import BrandHero from "../components/brandHero/BrandHero";

export default function BrandPage() {
  const { id } = useParams();
  const brandId = Number(id);


  return (
    <div className="brand-page">
      <BrandHero brandId={brandId} />
      <BrandDescription brandId={brandId} />
      <BookmarkCard brandId={brandId} />
    </div>
  );
}
