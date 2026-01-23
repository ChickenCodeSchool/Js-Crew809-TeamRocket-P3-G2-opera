import { Outlet, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaUsers } from "react-icons/fa";
import './AdminPage.css';
import logoOpera from "../../assets/images/logo_operawhite_fixed.png";

export default function AdminPage() {
  const location = useLocation();

  const links = [
    { to: "/admin", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/adminproducts", icon: <FaBoxOpen />, label: "Gestion des produits" },
    { to: "/admin/clients", icon: <FaUsers />, label: "Gestion des clients" },
  ];

  return (
    <div className="admin-container">
      <nav className="admin-navbar">
        <div className="admin-logo">
          <img src={logoOpera} alt="Logo OPÉRA" />
        </div>

        <ul>
          {links.map((link) => (
            <li key={link.to} className={location.pathname === link.to ? "active" : ""}>
              <a href={link.to}>
                <span className="icon">{link.icon}</span>
                <span className="label">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="admin-dashboard">
        <Outlet />
      </main>
    </div>
  );
}
