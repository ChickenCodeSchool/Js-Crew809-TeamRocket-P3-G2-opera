import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { Auth, User } from "../../App";
import "./Profile.css";
import imageopera from "../../assets/images/imageopera.jpg";

function Profile() {
  const { auth, setAuth } = useOutletContext<{
    auth: Auth | null;
    setAuth: (auth: Auth | null) => void;
  }>();

  if (!auth || !auth.user) {
    return <div className="profile_page" />;
  }

  const user: User = auth.user;
  const [editingSection, setEditingSection] = useState<"personal" | "address" | null>(null);
  const [editedUser, setEditedUser] = useState<User>(user);

  const handleEdit = (section: "personal" | "address") => setEditingSection(section);
  const handleChange = (field: keyof User, value: string) =>
    setEditedUser({ ...editedUser, [field]: value });

  const handleSave = async (section: "personal" | "address") => {
    try {
      const response = await fetch(`http://localhost:3310/customers/${user.customer_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          section === "personal"
            ? {
                firstname: editedUser.firstname,
                lastname: editedUser.lastname,
                mail: editedUser.mail,
                phone: editedUser.phone,
              }
            : {
                adress: editedUser.adress,
                postal_code: editedUser.postal_code,
                country: editedUser.country,
              }
        ),
      });

      if (response.ok) {
        setAuth({ ...auth, user: editedUser });
        setEditingSection(null);
      } else {
        alert("Erreur lors de la mise à jour");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  return (
    <div className="profile_page">
      <img src={imageopera} alt="mini-hero-profil" className="mini-hero-profil" />
      <h2 className="profile_title">Mon profil</h2>

      <div className="profile_content">
        <div className="profile_cards">
          <div className="profile_card">
            <h3>Mes données personnelles</h3>
            <div className="card_icons">
              {editingSection !== "personal" ? (
                <Pencil className="edit_icon" onClick={() => handleEdit("personal")} />
              ) : (
                <>
                  <Check className="edit_icon" onClick={() => handleSave("personal")} />
                  <X className="edit_icon" onClick={() => setEditingSection(null)} />
                </>
              )}
            </div>
            <div className="profile_info">
              {editingSection === "personal" ? (
                <>
                  <input
                    className="edit_input"
                    value={editedUser.firstname}
                    onChange={(e) => handleChange("firstname", e.target.value)}
                  />
                  <input
                    className="edit_input"
                    value={editedUser.lastname}
                    onChange={(e) => handleChange("lastname", e.target.value)}
                  />
                  <input
                    className="edit_input"
                    value={editedUser.mail}
                    onChange={(e) => handleChange("mail", e.target.value)}
                  />
                  <input
                    className="edit_input"
                    value={editedUser.phone ?? ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </>
              ) : (
                <>
                  <p><strong>Prénom :</strong> {user.firstname ?? "Non renseigné"}</p>
                  <p><strong>Nom :</strong> {user.lastname ?? "Non renseigné"}</p>
                  <p><strong>Email :</strong> {user.mail ?? "Non renseigné"}</p>
                  <p><strong>Téléphone :</strong> {user.phone ?? "Non renseigné"}</p>
                  <p><strong>N° client :</strong> {user.customer_id}</p>
                </>
              )}
            </div>
          </div>

          <div className="profile_card">
            <h3>Mes adresses</h3>
            <div className="card_icons">
              {editingSection !== "address" ? (
                <Pencil className="edit_icon" onClick={() => handleEdit("address")} />
              ) : (
                <>
                  <Check className="edit_icon" onClick={() => handleSave("address")} />
                  <X className="edit_icon" onClick={() => setEditingSection(null)} />
                </>
              )}
            </div>
            <div className="profile_info">
              {editingSection === "address" ? (
                <>
                  <input
                    className="edit_input"
                    value={editedUser.adress ?? ""}
                    onChange={(e) => handleChange("adress", e.target.value)}
                  />
                  <input
                    className="edit_input"
                    value={editedUser.postal_code ?? ""}
                    onChange={(e) => handleChange("postal_code", e.target.value)}
                  />
                  <input
                    className="edit_input"
                    value={editedUser.country ?? ""}
                    onChange={(e) => handleChange("country", e.target.value)}
                  />
                </>
              ) : (
                <>
                  <p><strong>Adresse :</strong> {user.adress ?? "Non renseignée"}</p>
                  <p><strong>Code postal :</strong> {user.postal_code ?? "Non renseigné"}</p>
                  <p><strong>Pays :</strong> {user.country ?? "Non renseigné"}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
