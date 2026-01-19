import { useRef } from "react";
import type { FormEventHandler } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { Auth } from "../../App";
import "../login/Login.css";
import imageopera from "../../assets/images/imageopera.jpg"

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { setAuth } = useOutletContext<{
    setAuth: (auth: Auth | null) => void;
  }>();
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3310/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        mail: emailRef.current?.value,
        password: passwordRef.current?.value,
  }),
});

      if (response.ok) {
        const data: Auth = await response.json();
        setAuth(data);
        navigate("/profile");
      } else {
        alert("Erreur de connexion : vérifier vos identifiants");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  return (
  <div className="login_page">
    <img
      src={imageopera}
      alt="mini-hero-connexion"
     className="mini-hero-connexion"
  />

  <div className="login_form_container">
    <form onSubmit={handleSubmit} className="login_form">
      <h2>Connexion</h2>

      <div>
        <label htmlFor="email">E-mail</label>
        <input ref={emailRef} type="email" id="email" required />
      </div>

      <div>
        <label htmlFor="password">Mot de passe</label>
        <input ref={passwordRef} type="password" id="password" required />
      </div>

      <button type="submit">Se connecter</button>
    </form>
  </div>
</div>
  );
}

export default Login;
