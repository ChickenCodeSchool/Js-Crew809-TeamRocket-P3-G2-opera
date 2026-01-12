import "./Navbar.css";
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoBlack from "../../assets/images/logo_operablack_fixed.png";
import logoWhite from "../../assets/images/logo_operawhite_fixed.png";
import BurgerMenu from "../burgerNav/BurgerNav";

function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLanding = location.pathname === "/";

  const darkNavbarPages = ["/nouscontacter"];
  const shouldBeDark = darkNavbarPages.includes(location.pathname);

  useEffect(() => {
    if (shouldBeDark) {
      setTheme("dark");
      return;
    }

    if (!isLanding) {
      setTheme("light");
      return;
    }

    const setupObserver = () => {
      const sections = document.querySelectorAll("[data-nav-theme]");
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const newTheme = entry.target.getAttribute("data-nav-theme") as
                | "light"
                | "dark";
              setTheme(newTheme);
            }
          }
        },
        { threshold: 0.5 }
      );
      for (const section of sections) {
        observer.observe(section);
      }
      return observer;
    };

    const timeout = setTimeout(() => {
      setupObserver();
    }, 500);

    return () => clearTimeout(timeout);
  }, [location.pathname, isLanding, shouldBeDark]);

  return (
    <>
      <header className={`navbar ${theme}`}>
        <Link to="/">
          <img
            src={theme === "light" ? logoWhite : logoBlack}
            alt="Logo Opera"
            className="logo_navbar"
          />
        </Link>
        <h1 className="title_navbar">OPERA</h1>
        <div className="navbar_icons">
          <IoBagOutline
            size={24}
            className="cart_navbar"
            onClick={() => navigate("/cart")}
          />

          <FiUser
            size={24}
            className="user_navbar"
            onClick={() => navigate("/login")}
          />

          <button
            type="button"
            className="burger_btn"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <CiMenuBurger size={24} className="burger_navbar" />
          </button>
        </div>
      </header>

      <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

export default Navbar;
