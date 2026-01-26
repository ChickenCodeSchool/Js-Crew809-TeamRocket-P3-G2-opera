import { useState } from "react";
import type { FormEventHandler } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authentificationopera from "../../assets/images/authentificationopera.jpg"
import "./forgotpassword.css"

function ForgotPassword() {
  const [mail, setMail] = useState("");

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    if (!mail) {
      toast.error("Veuillez entrer votre email");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3310/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mail }),
        },
      );

      if (response.ok) {
        toast.success("Si un compte existe, un email a été envoyé");
      } else {
        toast.error("Une erreur est survenue");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    }
  };

  return (
    <div className="forgotpassword_page">
      <form onSubmit={handleSubmit} className="forgotpassword_form">
        <h2>Mot de passe oublié</h2>

        <div className="form_group">
          <input
            type="email"
            id="email"
            placeholder=" "
            required
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <label htmlFor="email">E-mail</label>
        </div>

        <button type="submit" className="login_button">
          Envoyer le lien
        </button>
      </form>
<img src={authentificationopera} alt="authimage" className="auth_image" />
      <ToastContainer position="top-left" autoClose={3000} limit={1} />
    </div>
  );
}

export default ForgotPassword;
