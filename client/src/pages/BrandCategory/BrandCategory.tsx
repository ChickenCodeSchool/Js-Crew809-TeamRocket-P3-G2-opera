import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderCategorie from "../../components/HeaderCategorie/headerCategorie";
import CategorieProduct, {
  type Product,
} from "../../components/categorieProduct/CategorieProduct";
import FilterBar from "../../components/filterBar/FilterBar";

import "./BrandCategory.css";

function BrandCategory() {
  const { brandId, categoryId: urlCategoryId } = useParams<{
    brandId: string;
    categoryId: string;
  }>();

  const [filters, setFilters] = useState<{
    categoryId: string | undefined;
    color: string;
    size: string;
  }>({
    categoryId: urlCategoryId,
    color: "",
    size: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!brandId) return;

    const params = new URLSearchParams();
    params.append("brandId", brandId);

    if (filters.categoryId) params.append("categoryId", filters.categoryId);
    if (filters.color) params.append("color", filters.color);
    if (filters.size) params.append("size", filters.size);

    fetch(
      `${import.meta.env.VITE_API_URL}/api/products/filter?${params.toString()}`,
    )
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [filters, brandId]);

  return (
    <div className="brand-category-page">
      <HeaderCategorie brandId={Number(brandId)} />

      <div className="filter-btn-wrapper">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="filter-trigger-btn"
        >
          Filtrer <span>⚡</span>
        </button>
      </div>

      <CategorieProduct products={products} />

      <FilterBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}

export default BrandCategory;
