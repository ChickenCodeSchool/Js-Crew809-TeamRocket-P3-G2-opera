import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./FilterBar.css";

type FilterBarProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    categoryId: string | undefined;
    color: string;
    size: string;
    priceRange: string;
    brandId?: string;
  };
  setFilters: (filters: {
    categoryId: string | undefined;
    color: string;
    size: string;
    priceRange: string;
    brandId?: string;
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

type ColorOption = {
  color: string;
};

const COLOR_PALETTE: Record<string, string> = {
  Rouge: "#D32F2F",
  Noir: "#000000",
  Blanc: "#FFFFFF",
  Beige: "#F5F5DC",
  Marron: "#795548",
  Or: "#D4AF37",
  Doré: "#D4AF37",
  Argenté: "#C0C0C0",
  Argent: "#C0C0C0",
  Rose: "#E91E63",
  Vert: "#388E3C",
  Bleu: "#1976D2",
  Gris: "#808080",
  Jaune: "#FFEB3B",
  Orange: "#FF9800",
  Violet: "#9C27B0",
};

export default function FilterBar({
  isOpen,
  onClose,
  filters,
  setFilters,
}: FilterBarProps) {
  // brandId vient de l'URL (ex: /brand/1). Il est undefined sur /all
  const { brandId } = useParams();

  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [categories, setCategories] = useState<Item[]>([]);
  const [sizes, setSizes] = useState<SizeOption[]>([]);
  const [availableColors, setAvailableColors] = useState<ColorOption[]>([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [openSections, setOpenSections] = useState({
    brand: false,
    color: false,
    size: false,
    price: false,
    category: false,
  });

  // 1. Chargement des Marques (UNIQUEMENT si on n'est pas sur une page marque)
  useEffect(() => {
    if (brandId) return;

    let url = `${import.meta.env.VITE_API_URL}/api/filter/brands`;
    if (filters.categoryId) {
      url += `?categoryId=${filters.categoryId}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBrands(data);
      })
      .catch((err) => console.error(err));
  }, [filters.categoryId, brandId]);

  // 2. Chargement des Catégories
  useEffect(() => {
    let url = `${import.meta.env.VITE_API_URL}/api/filter/categories`;

    const activeBrandId = brandId || filters.brandId;

    if (activeBrandId) {
      url += `?brandId=${activeBrandId}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
        else setCategories([]);
      })
      .catch((err) => {
        console.error(err);
        setCategories([]);
      });
  }, [brandId, filters.brandId]);

  // 3. Chargement des Tailles
  useEffect(() => {
    if (!filters.categoryId) {
      setSizes([]);
      return;
    }

    const activeBrandId = brandId || filters.brandId;
    let url = `${import.meta.env.VITE_API_URL}/api/sizes?categoryId=${filters.categoryId}`;

    if (activeBrandId) {
      url += `&brandId=${activeBrandId}`;
    }

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
  }, [brandId, filters.brandId, filters.categoryId]);

  // 4. Chargement des Couleurs
  useEffect(() => {
    let url = `${import.meta.env.VITE_API_URL}/api/filter/colors`;
    const params = [];

    const activeBrandId = brandId || filters.brandId;

    if (activeBrandId) params.push(`brandId=${activeBrandId}`);
    if (filters.categoryId) params.push(`categoryId=${filters.categoryId}`);

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAvailableColors(data);
        else setAvailableColors([]);
      })
      .catch((err) => {
        console.error(err);
        setAvailableColors([]);
      });
  }, [brandId, filters.brandId, filters.categoryId]);

  const toggleSection = (
    section: "brand" | "color" | "size" | "category" | "price",
  ) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleBrandClick = (id: number) => {
    const idString = id.toString();
    setFilters({
      ...filters,
      brandId: filters.brandId === idString ? "" : idString,
      categoryId: undefined,
    });
  };

  const handleColorClick = (colorName: string) => {
    setFilters({
      ...filters,
      color: filters.color === colorName ? "" : colorName,
    });
  };

  const handleSizeClick = (label: string) => {
    setFilters({ ...filters, size: filters.size === label ? "" : label });
  };

  const handleCategoryClick = (id: number) => {
    const idString = id.toString();
    setFilters({
      ...filters,
      categoryId: filters.categoryId === idString ? undefined : idString,
      size: "",
      color: "",
    });
  };

  const applyPriceFilter = () => {
    const range = `${minPrice}-${maxPrice}`;
    if (minPrice === "" && maxPrice === "") {
      setFilters({ ...filters, priceRange: "" });
    } else {
      setFilters({ ...filters, priceRange: range });
    }
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

        {/* 1. MARQUE - Affiché SEULEMENT si 'brandId' n'est pas dans l'URL (donc page AllProducts) */}
        {!brandId && (
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
                    className={`category-item ${
                      filters.brandId === brand.id.toString() ? "selected" : ""
                    }`}
                    onClick={() => handleBrandClick(brand.id)}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. CATÉGORIES */}
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
                <span className="info-text">Aucune catégorie disponible.</span>
              ) : (
                categories.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    className={`category-item ${
                      filters.categoryId === cat.id?.toString()
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => cat.id && handleCategoryClick(cat.id)}
                  >
                    {cat.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* 3. COULEUR */}
        <div className="filter-section">
          <button
            type="button"
            className="filter-header"
            onClick={() => toggleSection("color")}
          >
            <span>COULEURS</span>
            <span className="toggle-icon">
              {openSections.color ? "-" : "+"}
            </span>
          </button>
          {openSections.color && (
            <div className="filter-options">
              {availableColors.length === 0 ? (
                <span className="info-text">Aucune couleur trouvée.</span>
              ) : (
                availableColors.map((c) => {
                  const hexCode = COLOR_PALETTE[c.color] || "#CCCCCC";
                  const isWhiteOrBeige =
                    c.color === "Blanc" || c.color === "Beige";

                  return (
                    <button
                      type="button"
                      key={c.color}
                      className="color-option"
                      onClick={() => handleColorClick(c.color)}
                    >
                      <div
                        className="color-swatch"
                        style={{ backgroundColor: hexCode }}
                        data-border={isWhiteOrBeige ? "true" : "false"}
                      />
                      <span
                        className={
                          filters.color === c.color ? "text-selected" : ""
                        }
                      >
                        {c.color}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* 4. TAILLE */}
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
                    className={`category-item ${
                      filters.size === s.size_label ? "selected" : ""
                    }`}
                    onClick={() => handleSizeClick(s.size_label)}
                  >
                    {s.size_label}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* 5. PRIX */}
        <div className="filter-section">
          <button
            type="button"
            className="filter-header"
            onClick={() => toggleSection("price")}
          >
            <span>PRIX</span>
            <span className="toggle-icon">
              {openSections.price ? "-" : "+"}
            </span>
          </button>
          {openSections.price && (
            <div className="filter-options price-inputs-container">
              <div className="price-inputs-row">
                <input
                  type="number"
                  placeholder="Min €"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="price-input"
                  min="0"
                />
                <span className="price-separator">-</span>
                <input
                  type="number"
                  placeholder="Max €"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="price-input"
                  min="0"
                />
              </div>
              <button
                type="button"
                className="price-apply-btn"
                onClick={applyPriceFilter}
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
