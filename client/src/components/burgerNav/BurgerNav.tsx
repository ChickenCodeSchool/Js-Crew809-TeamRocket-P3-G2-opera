import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./BurgerNav.css";

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BrandData {
  id: number;
  brandName: string;
}

interface ApiCollectionItem {
  brand_id: number;
  brand_name: string;
  [key: string]: unknown;
}

function BurgerMenu({ isOpen, onClose }: BurgerMenuProps) {
  const [brands, setBrands] = useState<BrandData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen || brands.length > 0) return;

    const controller = new AbortController();

    fetch(`${import.meta.env.VITE_API_URL}/api/collections`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((data: ApiCollectionItem[]) => {
        const uniqueBrands: Record<string, BrandData> = {};

        for (const item of data) {
          if (!uniqueBrands[item.brand_name]) {
            uniqueBrands[item.brand_name] = {
              id: item.brand_id,
              brandName: item.brand_name,
            };
          }
        }

        const brandsArray = Object.values(uniqueBrands).sort((a, b) =>
          a.brandName.localeCompare(b.brandName),
        );
        setBrands(brandsArray);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Erreur fetch burger menu:", err);
        }
      });

    return () => controller.abort();
  }, [isOpen, brands.length]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div
      className={`burger-menu-root ${isOpen ? "open" : ""}`}
      aria-hidden={!isOpen}
    >
      <div
        className="burger-overlay"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        role="button"
        tabIndex={0}
        aria-label="Fermer le menu"
      />

      <div className="burger-panel">
        <div className="burger-header">
          <button
            type="button"
            className="burger-close-btn"
            onClick={onClose}
            aria-label="Fermer le menu"
          >
            <IoClose size={20} color="#fff" />
          </button>
        </div>

        <div className="burger-content">
          <ul className="burger-list main-list">
            {brands.map((brand) => (
              <li key={brand.id}>
                <button
                  type="button"
                  onClick={() => handleNavigation(`/brand/${brand.id}`)}
                  className="burger-link-btn"
                >
                  {brand.brandName}
                </button>
              </li>
            ))}
          </ul>

          <ul className="burger-list utility-list">
            <li>
              <button
                type="button"
                onClick={() => handleNavigation("/login")}
                className="burger-link-btn"
              >
                Connexion
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNavigation("/orders")}
                className="burger-link-btn"
              >
                Mes commandes
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNavigation("/contact")}
                className="burger-link-btn"
              >
                Nous contacter
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;
