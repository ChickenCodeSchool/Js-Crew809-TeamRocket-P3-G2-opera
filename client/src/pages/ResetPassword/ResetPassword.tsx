import { useState } from "react";
import type { FormEventHandler } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authentificationopera from "../../assets/images/authentificationopera.jpg"
import "./ResetPassword.css"

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error("Token invalide");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    try {
      const response = await fetch("http://localhost:3310/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        toast.success("Mot de passe modifié avec succès");
        setTimeout(() => navigate("/auth"), 2000);
      } else {
        const data = await response.json();
        toast.error(data.error || "Token invalide ou expiré");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    }
  };

  return (
    <div className="reset-page">
      <form onSubmit={handleSubmit} className="resetpassword_form">
        <h2>Nouveau mot de passe</h2>

        <div className="form_group">
          <input
            type="password"
            id="password"
            placeholder=" "
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Nouveau mot de passe</label>
        </div>

        <div className="form_group">
          <input
            type="password"
            id="confirmPassword"
            placeholder=" "
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
        </div>

        <button type="submit" className="login_button">
          Changer le mot de passe
        </button>
      </form>

      <ToastContainer
        position="top-left"
        autoClose={3000}
        limit={1}
      />
      <img src={authentificationopera} alt="authimage" className="auth_image" />
    </div>
  );
}

export default ResetPassword;