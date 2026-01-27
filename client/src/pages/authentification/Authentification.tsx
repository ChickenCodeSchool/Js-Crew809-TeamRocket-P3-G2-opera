import { useState } from "react";
import { useNavigate } from "react-router";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";
import "./Authentification.css";
import authentificationopera from "../../assets/images/authentificationopera.jpg";

function Authentification() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="auth_page">
      <div className="auth_form_container">
        {isLogin ? <Login /> : <Register />}

        <p className="auth_toggle">
          {isLogin ? (
            <>
              Pas encore inscrit ?{" "}
              <button
                type="button"
                className="auth_link"
                onClick={() => setIsLogin(false)}
              >
                S'inscrire
              </button>
            </>
          ) : (
            <>
              Déjà un compte ?{" "}
              <button
                type="button"
                className="auth_link"
                onClick={() => setIsLogin(true)}
              >
                Se connecter
              </button>
              <button
                type="button"
                className="forgotpassword"
                onClick={() => navigate("/forgot-password")}
              >
                Mot de passe oublié ?
              </button>
            </>
          )}
        </p>
      </div>

      <img src={authentificationopera} alt="authimage" className="auth_image" />
    </div>
  );
}

export default Authentification;
