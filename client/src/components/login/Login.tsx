import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import type { Auth } from "../../App";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { useCartContext } from "../../contexts/CartContext";
import PrivacyModal from "../PolitiqueConfidentialite/PrivacyModal";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { setAuth } = useOutletContext<{
    setAuth: (auth: Auth | null) => void;
  }>();
  const navigate = useNavigate();
  const { syncWithDatabase } = useCartContext();

  const [consentGoogle, setConsentGoogle] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

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
        if (!data.user) {
          toast.error("Erreur serveur : données manquantes");
          return;
        }

        setAuth(data);

        try {
          await syncWithDatabase(data.user.customer_id);
          toast.success("Panier synchronisé !");
        } catch (error) {
          console.error("Erreur sync panier:", error);
        }

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

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    if (!consentGoogle) {
      toast.error(
        "Vous devez accepter la politique de confidentialité pour créer un compte avec Google.",
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3310/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      if (response.ok) {
        const data: Auth = await response.json();
        if (!data.user) {
          toast.error("Erreur serveur : données manquantes");
          return;
        }

        setAuth(data);

        try {
          await syncWithDatabase(data.user.customer_id);
          toast.success("Panier synchronisé !");
        } catch (error) {
          console.error("Erreur sync panier Google:", error);
        }

        if (data.user.role === 1) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Erreur de connexion avec Google");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    }
  };

  const handleGoogleError = () => {
    toast.error("Échec de la connexion avec Google");
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
            autoComplete="email"
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
            autoComplete="current-password"
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

        <div className="google-login-divider">
          <span>OU</span>
        </div>

        <div className="form_group checkbox_group">
          <input
            type="checkbox"
            id="rgpd-consent-google"
            checked={consentGoogle}
            onChange={(e) => setConsentGoogle(e.target.checked)}
          />
          <label htmlFor="rgpd-consent-google">
            En créant mon compte avec Google, j’accepte que mes données
            personnelles soient traitées pour la gestion de mon compte et de mes
            commandes, conformément à la{" "}
            <button
              type="button"
              className="register_privacy_link"
              onClick={(e) => {
                e.stopPropagation();
                setIsPrivacyOpen(true);
              }}
            >
              politique de confidentialité
            </button>
            .
          </label>
        </div>

        <div className="google-login-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            text="continue_with"
          />
        </div>
      </form>

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

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
