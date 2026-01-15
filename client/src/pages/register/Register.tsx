import "../register/Register.css";
import { useRef, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { Auth } from "../../App";

function Register() {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { setAuth } = useOutletContext<{
    setAuth: (auth: Auth | null) => void;
  }>();

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPassword(e.target.value);

  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => setConfirmPassword(e.target.value);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    if (!firstnameRef.current || !lastnameRef.current || !emailRef.current) {
      alert("Les champs ne sont pas remplis correctement");
      return;
    }
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await fetch("http://localhost:3310/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: firstnameRef.current.value,
          lastname: lastnameRef.current.value,
          mail: emailRef.current.value,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setAuth(data);

        navigate("/profile");
      } else {
        alert("Erreur lors de l'inscription");
      }
    } catch (err) {
      console.error("Erreur fetch :", err);
      alert("Erreur serveur");
    }
  };

  return (
    <div className="register_page">
      <form onSubmit={handleSubmit} className="register_form">
        <h2>Inscription</h2>

        <div>
          <label htmlFor="firstname">Prénom</label>
          <input ref={firstnameRef} type="text" id="firstname" required />
        </div>

        <div>
          <label htmlFor="lastname">Nom</label>
          <input ref={lastnameRef} type="text" id="lastname" required />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>

        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span className="password-info">
            {password.length >= 8 ? "✅" : "❌"} (min 8 caractères)
          </span>
        </div>

        <div>
          <label htmlFor="confirm-password">Confirmer le mot de passe</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <span className="password-info">
            {password === confirmPassword ? "✅" : "❌"}
          </span>
        </div>

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;
