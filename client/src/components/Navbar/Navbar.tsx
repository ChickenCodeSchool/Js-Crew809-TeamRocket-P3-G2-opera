import "./Navbar.css";
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import logoBlack from "../../assets/images/logo_operablack_fixed.png";
import logoWhite from "../../assets/images/logo_operawhite_fixed.png";

function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const setupObserver = () => {
      const sections = document.querySelectorAll("[data-nav-theme]");
      console.log("Sections trouvées:", sections.length);

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const newTheme = entry.target.getAttribute("data-nav-theme") as
                | "light"
                | "dark";
              console.log("Nouveau thème:", newTheme);
              setTheme(newTheme);
            }
          }
        },
        { threshold: 0.5 },
      );

      for (const section of sections) {
        observer.observe(section);
      }

      return observer;
    };

    // Attendre que le DOM soit prêt avec les sections
    const timeout = setTimeout(() => {
      setupObserver();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <header className={`navbar ${theme}`}>
      <img
        src={theme === "light" ? logoWhite : logoBlack}
        alt="Logo Opera"
        className="logo_navbar"
      />
      <h1 className="title_navbar">OPERA</h1>
      <div className="navbar_icons">
        <IoBagOutline size={24} className="cart_navbar" />
        <FiUser size={24} className="user_navbar" />
        <CiMenuBurger size={24} className="burger_navbar" />
      </div>
    </header>
  );
}

export default Navbar;
