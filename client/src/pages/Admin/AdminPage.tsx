import {
  FaBoxOpen,
  FaShoppingCart,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./AdminPage.css";
import logoOpera from "../../assets/images/logo_operawhite_fixed.png";

interface LinkItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export default function AdminPage() {
  const location = useLocation();
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
    navigate("/");
  };

  return (
    <div className="admin-container">
      <nav className="admin-navbar">
        <div className="admin-logo">
          <img src={logoOpera} alt="Logo OPÉRA" />
        </div>

        <ul>
          {links.map((link) => (
            <li
              key={link.to}
              className={location.pathname === link.to ? "active" : ""}
            >
              <a href={link.to} className="nav-link">
                <span className="icon">{link.icon}</span>
                <span className="label">{link.label}</span>
              </a>
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

      <main className="admin-dashboard">
        <Outlet />
      </main>
    </div>
  );
}
