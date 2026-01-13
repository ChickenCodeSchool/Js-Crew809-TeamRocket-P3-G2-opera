import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./FilterBar.css";

type FilterBarProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: { categoryId: string | undefined; color: string; size: string };
  setFilters: (filters: {
    categoryId: string | undefined;
    color: string;
    size: string;
  }) => void;
};

type BrandItem = {
  id: number;
  name: string;
  default_category_id: number | null;
};

type Item = {
  id: number;
  name: string;
};

type SizeOption = {
  size_label: string;
};

const COLORS = [
  { name: "Rouge", hex: "#D32F2F" },
  { name: "Noir", hex: "#000000" },
  { name: "Blanc", hex: "#FFFFFF" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Marron", hex: "#795548" },
  { name: "Or", hex: "#D4AF37" },
  { name: "Argenté", hex: "#C0C0C0" },
  { name: "Rose", hex: "#E91E63" },
  { name: "Vert", hex: "#388E3C" },
  { name: "Bleu", hex: "#1976D2" },
  { name: "Gris", hex: "#808080" },
];

export default function FilterBar({
  isOpen,
  onClose,
  filters,
  setFilters,
}: FilterBarProps) {
  const { brandId } = useParams();
  const navigate = useNavigate();

  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [categories, setCategories] = useState<Item[]>([]);
  const [sizes, setSizes] = useState<SizeOption[]>([]);

  const [openSections, setOpenSections] = useState({
    brand: false,
    category: false,
    color: false,
    size: false,
  });

  // Chargement des marques
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/filter/brands`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBrands(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Chargement des catégories
  useEffect(() => {
    if (!brandId) return;
    fetch(
      `${import.meta.env.VITE_API_URL}/api/filter/categories?brandId=${brandId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
        else setCategories([]);
      })
      .catch((err) => {
        console.error(err);
        setCategories([]);
      });
  }, [brandId]);

  // Chargement des tailles
  useEffect(() => {
    if (!brandId) return;

    if (!filters.categoryId) {
      setSizes([]);
      return;
    }

    const url = `${import.meta.env.VITE_API_URL}/api/sizes?brandId=${brandId}&categoryId=${filters.categoryId}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSizes(data);
        else setSizes([]);
      })
      .catch((err) => {
        console.error(err);
        setSizes([]);
      });
  }, [brandId, filters.categoryId]);

  const toggleSection = (section: "brand" | "category" | "color" | "size") => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // --- Redirection intelligente ---
  const handleBrandClick = (brand: BrandItem) => {
    if (brandId === brand.id.toString()) return;

    let targetCategoryId = brand.default_category_id;

    if (!targetCategoryId) {
      console.warn("Cette marque n'a aucun produit/catégorie associé.");
      targetCategoryId = 1;
    }

    navigate(`/brand/${brand.id}/category/${targetCategoryId}`);

    onClose();
  };

  const handleCategoryClick = (id: number) => {
    const idString = id.toString();
    setFilters({
      ...filters,
      categoryId: filters.categoryId === idString ? undefined : idString,
      size: "",
    });
  };

  const handleSizeClick = (label: string) => {
    setFilters({
      ...filters,
      size: filters.size === label ? "" : label,
    });
  };

  const handleColorClick = (colorName: string) => {
    setFilters({
      ...filters,
      color: filters.color === colorName ? "" : colorName,
    });
  };

  return (
    <>
      <button
        type="button"
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
        aria-label="Fermer le menu"
      />

      <div className={`sidebar-content ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose} type="button">
          FERMER
        </button>

        {/* --- MARQUES --- */}
        <div className="filter-section">
          <button
            type="button"
            className="filter-header"
            onClick={() => toggleSection("brand")}
          >
            <span>MARQUE</span>
            <span className="toggle-icon">
              {openSections.brand ? "-" : "+"}
            </span>
          </button>

          {openSections.brand && (
            <div className="filter-options">
              {brands.map((brand) => (
                <button
                  type="button"
                  key={brand.id}
                  className="category-item"
                  style={{
                    fontWeight:
                      brandId === brand.id.toString() ? "bold" : "normal",
                  }}
                  onClick={() => handleBrandClick(brand)}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- CATÉGORIES --- */}
        <div className="filter-section">
          <button
            type="button"
            className="filter-header"
            onClick={() => toggleSection("category")}
          >
            <span>CATÉGORIES</span>
            <span className="toggle-icon">
              {openSections.category ? "-" : "+"}
            </span>
          </button>

          {openSections.category && (
            <div className="filter-options">
              {categories.length === 0 ? (
                <span className="info-text">
                  Aucune catégorie trouvée pour cette marque.
                </span>
              ) : (
                categories.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    className="category-item"
                    style={{
                      fontWeight:
                        filters.categoryId === cat.id?.toString()
                          ? "bold"
                          : "normal",
                    }}
                    onClick={() => cat.id && handleCategoryClick(cat.id)}
                  >
                    {cat.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* --- TAILLES --- */}
        <div className="filter-section">
          <button
            type="button"
            className="filter-header"
            onClick={() => toggleSection("size")}
          >
            <span>TAILLE</span>
            <span className="toggle-icon">{openSections.size ? "-" : "+"}</span>
          </button>

          {openSections.size && (
            <div className="filter-options">
              {!filters.categoryId ? (
                <span className="info-text">
                  Veuillez d'abord choisir une catégorie.
                </span>
              ) : sizes.length === 0 ? (
                <span className="info-text">Aucune taille trouvée.</span>
              ) : (
                sizes.map((s) => (
                  <button
                    type="button"
                    key={s.size_label}
                    className="category-item"
                    style={{
                      fontWeight:
                        filters.size === s.size_label ? "bold" : "normal",
                    }}
                    onClick={() => handleSizeClick(s.size_label)}
                  >
                    {s.size_label}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* --- COULEURS --- */}
        <div className="filter-section">
          <button
            type="button"
            className="filter-header"
            onClick={() => toggleSection("color")}
          >
            <span>COULEUR</span>
            <span className="toggle-icon">
              {openSections.color ? "-" : "+"}
            </span>
          </button>

          {openSections.color && (
            <div className="filter-options">
              {COLORS.map((c) => (
                <button
                  type="button"
                  key={c.name}
                  className="color-option"
                  onClick={() => handleColorClick(c.name)}
                >
                  <div
                    className="color-swatch"
                    style={{
                      backgroundColor: c.hex,
                      border:
                        c.name === "Blanc" || c.name === "Beige"
                          ? "1px solid #ccc"
                          : "none",
                    }}
                  />
                  <span
                    style={{
                      fontWeight: filters.color === c.name ? "bold" : "normal",
                    }}
                  >
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
