import "./ProfileMenu.css";
import { useNavigate } from "react-router-dom";
import type { Auth } from "../../App";

interface ProfileMenuProps {
  auth: Auth | null;
  setAuth: (auth: Auth | null) => void;
}

function ProfileMenu({ auth, setAuth }: ProfileMenuProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(null);
    navigate("/");
  };

  if (auth) {
    return (
      <div className="profile_menu">
        <p>
          Bonjour {auth.user.firstname} {auth.user.lastname}
        </p>
        <button type="button" onClick={() => navigate("/profile")}>
          Mon profil
        </button>
        <button type="button" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    );
  }

  return (
    <div className="profile_menu">
      <button type="button" onClick={() => navigate("/login")}>
        Se connecter
      </button>
      <button type="button" onClick={() => navigate("/register")}>
        S'inscrire
      </button>
    </div>
  );
}
export default ProfileMenu;
