import {
  FaBoxOpen,
  FaShoppingCart,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logoOpera from "../../assets/images/logo_operawhite_fixed.png";
import "./Sidebar.css";

interface LinkItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export default function Sidebar() {
  const navigate = useNavigate();

  const links: LinkItem[] = [
    { to: "/admin", icon: <FaTachometerAlt />, label: "Dashboard" },
    {
      to: "/adminproducts",
      icon: <FaBoxOpen />,
      label: "Gestion des produits",
    },
    {
      to: "/admin/orders",
      icon: <FaShoppingCart />,
      label: "Gestion des commandes",
    },
    { to: "/admin/clients", icon: <FaUsers />, label: "Gestion des clients" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth", { replace: true });
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-logo">
        <img src={logoOpera} alt="Logo OPÉRA" />
      </div>

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
