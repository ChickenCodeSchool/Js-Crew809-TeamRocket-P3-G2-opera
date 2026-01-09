import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BrandPage.css";
import BrandDescription from "../components/brandDescription/BrandDescription";
import BookmarkCard from "../components/BookmarkCard/BookmarkCard";
import HeaderCategorie from "../components/HeaderCategorie/headerCategorie";
import CategorieProduct from "../components/categorieProduct/CategorieProduct";

export default function BrandPage() {
  const { id } = useParams();
  const brandId = Number(id);
  const [selectedCategory, setSelectedCategory] = useState <number | null>(null);

  const handleCategoryClick = (categoryId : number) => {
    setSelectedCategory(categoryId);
  };

useEffect(() => {
  const navbar = document.querySelector(".navbar");
  navbar?.classList.add("brand-page__navbar-static");
  return () => {navbar?.classList.remove("brand-page__navbar-static");
  };
}, []);

  return (
    <div className="brand-page">
      <HeaderCategorie brandId={brandId} />
      <BrandDescription brandId={brandId} />
      <BookmarkCard brandId={brandId} onCategoryClick={handleCategoryClick}/>
      {selectedCategory && (
        <CategorieProduct brandId={brandId} categoryId={selectedCategory} name=""/>
      )}
    </div>
  );
}
