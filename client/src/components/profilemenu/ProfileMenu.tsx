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

   if (auth?.user) {
    return (
      <div className="profile_menu">
        <p>
           {auth.user.firstname} 
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
      <button type="button" onClick={() => navigate("/auth")}>
        Se connecter
      </button>
    {/* <button type="button" onClick={() => navigate("/register")}>
        S'inscrire
      </button>*/}
    </div>
  );
}
export default ProfileMenu;
