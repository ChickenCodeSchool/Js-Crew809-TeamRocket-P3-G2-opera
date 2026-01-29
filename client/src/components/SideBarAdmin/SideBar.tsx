import {
  FaBoxOpen,
  FaShoppingCart,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import logoOpera from "../../assets/images/logo_operawhite_fixed.png";
import "./Sidebar.css";
import type { Auth } from "../../App";

interface LinkItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

interface OutletContextType {
  auth: Auth | null;
  setAuth: (auth: Auth | null) => void;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const { setAuth } = useOutletContext<OutletContextType>();

  const links: LinkItem[] = [
    { to: "/admin", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/adminproducts", icon: <FaBoxOpen />, label: "Gestion des produits" },
    { to: "/admin/orders", icon: <FaShoppingCart />, label: "Gestion des commandes" },
    { to: "/admin/clients", icon: <FaUsers />, label: "Gestion des clients" },
  ];

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3310/auth/logout", {
        method: "POST",
        credentials: "include", 
      });

      setAuth(null);

      localStorage.clear();
      sessionStorage.clear();

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Erreur lors de la déconnexion admin :", err);
    }
  };

  return (
    <nav className="admin-navbar">
      <NavLink to="/" className="admin-logo">
        <img src={logoOpera} alt="Logo OPÉRA" />
      </NavLink>

      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="icon">{link.icon}</span>
              <span className="label">{link.label}</span>
            </NavLink>
          </li>
        ))}

        <li className="logout-item">
          <button type="button" className="logout-btn" onClick={handleLogout}>
            <span className="icon">
              <FaSignOutAlt />
            </span>
            <span className="label">Déconnexion</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
