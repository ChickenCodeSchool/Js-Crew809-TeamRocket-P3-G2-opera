// import { GoogleLogin } from "@react-oauth/google";
// import type { CredentialResponse } from "@react-oauth/google";
// import { useRef } from "react";
// import type { FormEventHandler } from "react";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import type { Auth } from "../../App";
// import "react-toastify/dist/ReactToastify.css";
// import "./Login.css";
// import { Link } from "react-router-dom";
// import { useCartContext } from "../../contexts/CartContext";

// function Login() {
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);

//   const { setAuth } = useOutletContext<{
//     setAuth: (auth: Auth | null) => void;
//   }>();
//   const navigate = useNavigate();
//   const { syncWithDatabase } = useCartContext();

//   const handleSubmit: FormEventHandler = async (event) => {
//     event.preventDefault();

//     const email = emailRef.current?.value?.trim();
//     const password = passwordRef.current?.value;

//     if (!email || !password) {
//       toast.error("Veuillez remplir tous les champs");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:3310/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ mail: email, password }),
//       });

//       if (response.ok) {
//         const data: Auth = await response.json();
//         console.log("✅ Données reçues du login:", data); // 👀 LOG

//         if (!data.token || !data.user) {
//           toast.error("Erreur serveur : données manquantes");
//           return;
//         }

//           localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));

//         setAuth(data);

//         console.log(
//           "🔄 Tentative de sync avec customer_id:",
//           data.user.customer_id,
//         ); // 👀 LOG

//         try {
//           await syncWithDatabase(data.user.customer_id);
//           toast.success("Panier synchronisé !");
//         } catch (error) {
//           console.error("❌ Erreur sync panier:", error);
//         }

//         if (data.user.role === 1) {
//           navigate("/admin");
//         } else {
//           navigate("/");
//         }
//       } else if (response.status === 422) {
//         toast.error("Adresse e-mail ou mot de passe incorrect");
//       } else {
//         toast.error("Erreur de connexion");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Erreur serveur");
//     }
//   };

//   const handleGoogleSuccess = async (
//     credentialResponse: CredentialResponse,
//   ) => {
//     try {
//       const response = await fetch("http://localhost:3310/auth/google", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ credential: credentialResponse.credential }),
//       });

//       if (response.ok) {
//         const data: Auth = await response.json();

//         if (!data.token || !data.user) {
//           toast.error("Erreur serveur : données manquantes");
//           return;
//         }

//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));

//         setAuth(data);

//         if (data.user.role === 1) {
//           navigate("/admin");
//         } else {
//           navigate("/");
//         }
//       } else {
//         toast.error("Erreur de connexion avec Google");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Erreur serveur");
//     }
//   };

//   const handleGoogleError = () => {
//     toast.error("Échec de la connexion avec Google");
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="login_form">
//         <h2>Connexion</h2>

//         <div className="form_group">
//           <input
//             ref={emailRef}
//             type="email"
//             id="email"
//             placeholder=" "
//             autoComplete="email"
//             required
//           />
//           <label htmlFor="email">E-mail</label>
//         </div>

//         <div className="form_group">
//           <input
//             ref={passwordRef}
//             type="password"
//             id="password"
//             placeholder=" "
//             autoComplete="current-password"
//             required
//           />
//           <label htmlFor="password">Mot de passe</label>
//         </div>

//         <button type="submit" className="login_button">
//           Se connecter
//         </button>

//         <Link to="/forgot-password" className="forgot-passwordlink">
//           Mot de passe oublié ?
//         </Link>

//         <div className="google-login-divider">
//           <span>OU</span>
//         </div>

//         <div className="google-login-wrapper">
//           <GoogleLogin
//             onSuccess={handleGoogleSuccess}
//             onError={handleGoogleError}
//             theme="outline"
//             size="large"
//             text="continue_with"
//           />
//         </div>
//       </form>

//       <ToastContainer
//         position="top-left"
//         autoClose={3000}
//         toastClassName="login-toast"
//         limit={1}
//       />
//     </>
//   );
// }

// export default Login;
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useRef } from "react";
import type { FormEventHandler } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import type { Auth } from "../../App";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { Link } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { setAuth } = useOutletContext<{
    setAuth: (auth: Auth | null) => void;
  }>();
  const navigate = useNavigate();
  const { syncWithDatabase } = useCartContext();

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
        console.log("✅ Données reçues du login:", data);

        if (!data.token || !data.user) {
          toast.error("Erreur serveur : données manquantes");
          return;
        }

        // ✅ CORRECTION 1 : Sauvegarder dans localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("💾 Token et user sauvegardés dans localStorage");

        setAuth(data);

        console.log(
          "🔄 Tentative de sync avec customer_id:",
          data.user.customer_id,
        );

        try {
          await syncWithDatabase(data.user.customer_id);
          toast.success("Panier synchronisé !");
        } catch (error) {
          console.error("❌ Erreur sync panier:", error);
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
    try {
      const response = await fetch("http://localhost:3310/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      if (response.ok) {
        const data: Auth = await response.json();
        console.log("✅ Données reçues du login Google:", data);

        if (!data.token || !data.user) {
          toast.error("Erreur serveur : données manquantes");
          return;
        }

        // ✅ CORRECTION 2 : Sauvegarder dans localStorage pour Google aussi
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("💾 Token et user Google sauvegardés dans localStorage");

        setAuth(data);

        // ✅ CORRECTION 3 : Synchroniser le panier après connexion Google
        console.log(
          "🔄 Tentative de sync Google avec customer_id:",
          data.user.customer_id,
        );

        try {
          await syncWithDatabase(data.user.customer_id);
          toast.success("Panier synchronisé !");
        } catch (error) {
          console.error("❌ Erreur sync panier Google:", error);
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
