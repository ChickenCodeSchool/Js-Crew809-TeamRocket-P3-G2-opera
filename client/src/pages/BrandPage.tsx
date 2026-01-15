// import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BrandPage.css";
import BrandDescription from "../components/brandDescription/BrandDescription";
import BookmarkCard from "../components/BookmarkCard/BookmarkCard";
import HeaderCategorie from "../components/HeaderCategorie/headerCategorie";

export default function BrandPage() {
  const { id } = useParams();
  const brandId = Number(id);


  return (
    <div className="brand-page">
      <HeaderCategorie brandId={brandId} />
      <BrandDescription brandId={brandId} />
      <BookmarkCard brandId={brandId} />
    </div>
  );
}
