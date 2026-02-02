import { useEffect, useState } from "react";
import AllProducts, {
  type GlobalProduct,
} from "../../components/AllProducts/AllProducts";
import ButtonFilterBar from "../../components/buttonFilterBar/ButtonFilterBar";
import FilterBar from "../../components/filterBar/FilterBar";
import imageopera from "../../assets/images/imageopera.jpg";
import "./AllProductsPage.css";

function AllProductsPage() {
  const [filters, setFilters] = useState<{
    categoryId: string | undefined;
    color: string;
    size: string;
    priceRange: string;
    brandId?: string;
  }>({
    categoryId: undefined,
    color: "",
    size: "",
    priceRange: "",
    brandId: "",
  });

  const [products, setProducts] = useState<GlobalProduct[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenFilter = () => {
    setIsSidebarOpen(true);
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.categoryId) params.append("categoryId", filters.categoryId);
    if (filters.color) params.append("color", filters.color);
    if (filters.size) params.append("size", filters.size);
    if (filters.priceRange) params.append("priceRange", filters.priceRange);
    if (filters.brandId) params.append("brandId", filters.brandId);

    fetch(
      `${import.meta.env.VITE_API_URL}/api/products/filter?${params.toString()}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
      });
  }, [filters]);

  return (
    <div className="container-AllProductsPage">
      <div className="hero-container-AllProductsPage">
        <img
          src={imageopera}
          alt="Hero"
          className="hero-image-AllProductsPage"
        />
      </div>
      <h1 className="title-AllProductsPage">Toutes les Collections</h1>

      <ButtonFilterBar onOpen={handleOpenFilter} />

      <AllProducts products={products} />

      <FilterBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}

export default AllProductsPage;
