import { useState} from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import type { Auth, User } from "../../App";

function Profile() {
  const { auth, setAuth } = useOutletContext<{ auth: Auth | null; setAuth: (auth: Auth | null) => void }>();
  const navigate = useNavigate();

  if (!auth) {
    return (
      <div>
        <p>Vous devez être connecté pour accéder à cette page.</p>
        <button type="button" onClick={() => navigate("/login")}>Se connecter</button>
      </div>
    );
  }

  const [userData, setUserData] = useState<User>({ ...auth.user });

  const fields: (keyof User)[] = [
    "firstname",
    "lastname",
    "mail",
    "birthday",
    "adress",
    "country",
    "phone",
  ];

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/customers/${auth.user.customer_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedUser: User = await response.json();
        setAuth({ user: updatedUser, token: auth.token });
        alert("Vos informations ont été mises à jour !");
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
      <h2>Mon profil</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              id={field}
              value={userData[field] ?? ""}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}

export default Profile;
