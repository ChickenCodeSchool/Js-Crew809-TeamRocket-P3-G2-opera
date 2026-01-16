import "./Register.css";
import { useRef, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { Auth, User } from "../../App";

function Register() {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const adressRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { setAuth } = useOutletContext<{
    setAuth: (auth: Auth | null) => void;
  }>();

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPassword(e.target.value);

  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setConfirmPassword(e.target.value);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    if (!firstnameRef.current || !lastnameRef.current || !emailRef.current) {
      alert("Les champs obligatoires ne sont pas remplis");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
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
          phone: phoneRef.current?.value || null,
          adress: adressRef.current?.value || null,
          country: countryRef.current?.value || null,
          postal_code: postalCodeRef.current?.value || null,
        }),
      });

      if (!response.ok) {
        alert("Erreur lors de l'inscription");
        return;
      }

      const data: { user: User } = await response.json();

      setAuth({
        user: data.user,
        token: "",
      });

      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  return (
    <div className="register_page">
      <form onSubmit={handleSubmit} className="register_form">
        <h2>Inscription</h2>

        <div>
          <label htmlFor="firstname">Prénom</label>
          <input ref={firstnameRef} id="firstname" required />
        </div>

        <div>
          <label htmlFor="lastname">Nom</label>
          <input ref={lastnameRef} id="lastname" required />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>

        <div>
          <label htmlFor="phone">N° téléphone</label>
          <input ref={phoneRef} type="tel" id="phone" placeholder="06 12 34 56 78" />
        </div>

        <div>
          <label htmlFor="adress">Adresse</label>
          <input ref={adressRef} id="adress" placeholder="12 rue Exemple" />
        </div>

        <div>
          <label htmlFor="postal-code">Code postal</label>
          <input ref={postalCodeRef} id="postal-code" placeholder="75000" />
        </div>

        <div>
          <label htmlFor="country">Pays</label>
          <input ref={countryRef} id="country" placeholder="France" />
        </div>

        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span className="password-info">
            {password.length >= 8 ? "✅" : "❌"} min. 8 caractères
          </span>
        </div>

        <div>
          <label htmlFor="confirm-password">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <span className="password-info">
            {password === confirmPassword ? "✅" : "❌"} correspondance
          </span>
        </div>

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;
