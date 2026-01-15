import { useRef, useState } from "react";
import type { FormEventHandler, ChangeEventHandler } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { Auth } from "../../App";

function Register() {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { setAuth } = useOutletContext<{ setAuth: (auth: Auth | null) => void }>();

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => setConfirmPassword(e.target.value);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await fetch("/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: (firstnameRef.current as HTMLInputElement).value,
          lastname: (lastnameRef.current as HTMLInputElement).value,
          mail: (emailRef.current as HTMLInputElement).value,
          password,
        }),
      });

      if (response.ok) {
        const data: Auth = await response.json();

        setAuth(data);

        navigate("/profile");
      } else {
        alert("Erreur lors de l'inscription");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  return (
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
        <input type="password" value={password} onChange={handlePasswordChange} required />
        {password.length >= 8 ? "✅" : "❌"} (min 8 caractères)
      </div>
      <div>
        <label htmlFor="confirm-password">Confirmer le mot de passe</label>
        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
        {password === confirmPassword ? "✅" : "❌"}
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default Register;
