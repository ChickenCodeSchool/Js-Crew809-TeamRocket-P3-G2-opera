import { useRef } from "react";
import type { FormEventHandler } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import type { Auth } from "../../App";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { setAuth } = useOutletContext<{
    setAuth: (auth: Auth | null) => void;
  }>();
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await fetch("http://localhost:3310/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ mail: email, password }),
      });

      if (response.ok) {
        const data: Auth = await response.json();

        if (!data.token || !data.user) {
          toast.error("Erreur serveur : données manquantes");
          return;
        }

        setAuth(data);

        if (data.user.role === 1) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else if (response.status === 422) {
        toast.error("Adresse e-mail ou mot de passe incorrect");
      } else {
        toast.error("Erreur de connexion");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
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

        <Link to="/forgot-password" className="forgot-passwordlink">
          Mot de passe oublié ?
        </Link>
      </form>

      <ToastContainer
        position="top-left"
        autoClose={3000}
        toastClassName="login-toast"
        limit={1}
      />
    </>
  );
}

export default Login;
