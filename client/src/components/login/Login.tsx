import { useRef } from "react";
import type { FormEventHandler } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { Auth } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { setAuth } = useOutletContext<{ setAuth: (auth: Auth | null) => void }>();
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
        toast.error("Erreur de connexion : vérifier votre adresse ou mot de passe");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="login_form">
      <h2>Connexion</h2>

      <div className="form_group">
        <input
          ref={emailRef}
          type="email"
          id="email"
          placeholder=" "
          required
        />
        <label htmlFor="email">E-mail</label>
      </div>

      <div className="form_group">
        <input
          ref={passwordRef}
          type="password"
          id="password"
          placeholder=" "
          required
        />
        <label htmlFor="password">Mot de passe</label>
      </div>

      <button type="submit" className="login_button">
        Se connecter
      </button>
    </form>
    <ToastContainer position="top-left" autoClose={3000} toastClassName="login-toast" limit={1}/>
    </>
  );
}

export default Login;
