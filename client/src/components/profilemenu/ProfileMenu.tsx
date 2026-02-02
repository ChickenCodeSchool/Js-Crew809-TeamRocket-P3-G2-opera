import "./ProfileMenu.css";
import { useNavigate } from "react-router-dom";
import type { Auth } from "../../App";

interface ProfileMenuProps {
  auth: Auth | null;
  setAuth: (auth: Auth | null) => void;
  theme: "light" | "dark";
}

function ProfileMenu({ auth, setAuth, theme }: ProfileMenuProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setAuth(null);
    navigate("/");
  };

  const menuClass = `profile_menu ${theme}`;

  if (auth?.user) {
    const profileRoute = auth.user.role === 1 ? "/admin" : "/profile";

    return (
      <div className={menuClass}>
        <p>{auth.user.firstname}</p>
        <button type="button" onClick={() => navigate(profileRoute)}>
          Profil
        </button>
        <button type="button" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    );
  }

  return (
    <div className={menuClass}>
      <button type="button" onClick={() => navigate("/auth")}>
        Se connecter
      </button>
    </div>
  );
}

export default ProfileMenu;
