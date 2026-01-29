import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

export type User = {
  customer_id: number;
  firstname: string;
  lastname: string;
  mail: string;
  role: number;
  birthday?: string;
  postal_code?: string;
  adress?: string;
  country?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
};

export type Auth = {
  user: User;
  token: string;
};

function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isAdmin = location.pathname.startsWith("/admin");
  const [auth, setAuth] = useState<Auth | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: need to trigger on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("http://localhost:3310/auth/session", {
          credentials: "include", 
        });

        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setAuth({ token: "", user: data.user }); 
          }
        } else {
          setAuth(null); 
        }
      } catch (err) {
        console.error("Erreur lors de la récupération de la session:", err);
        setAuth(null);
      }
    };

    fetchSession();
  }, []);

  return (
    <>
      {!isAdmin && (
        <Navbar key={location.pathname} auth={auth} setAuth={setAuth} />
      )}
      <div className={!isLanding && !isAdmin ? "with-fixed-navbar" : ""}>
        <Outlet context={{ auth, setAuth }} />
      </div>
      {!isAdmin && <Footer />}
    </>
  );
}

export default App;
