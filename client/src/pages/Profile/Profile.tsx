import { useOutletContext, useNavigate } from "react-router-dom";
import type { Auth, User } from "../../App";
import "./Profile.css";

function Profile() {
  const { auth } = useOutletContext<{ auth: Auth | null; setAuth: (auth: Auth | null) => void }>();
  const navigate = useNavigate();

  if (!auth || !auth.user) {
    return (
      <div className="profile_page">
        <p>Vous devez être connecté pour accéder à cette page.</p>
        <button type="button" onClick={() => navigate("/login")}>
          Se connecter
        </button>
      </div>
    );
  }

  const user: User = auth.user;

  return (
    <div className="profile_page">
      <h2>Mon profil</h2>

      <div className="profile_cards">
        <div className="profile_card">
          <h3>Mes données personnelles</h3>
          <div className="profile_info">
            <p><strong>Nom :</strong> {user.lastname ?? "Non renseigné"}</p>
            <p><strong>Prénom :</strong> {user.firstname ?? "Non renseigné"}</p>
            <p><strong>Email :</strong> {user.mail ?? "Non renseigné"}</p>
            <p><strong>Téléphone :</strong> {user.phone ?? "Non renseigné"}</p>
            <p><strong>N° client :</strong> {user.customer_id ?? "Non renseigné"}</p>
          </div>
        </div>

        <div className="profile_card">
          <h3>Mes adresses</h3>
          <div className="profile_info">
            <p><strong>Nom :</strong> {user.lastname ?? "Non renseigné"}</p>
            <p><strong>Prénom :</strong> {user.firstname ?? "Non renseigné"}</p>
            <p><strong>Adresse :</strong> {user.adress ?? "Non renseignée"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
