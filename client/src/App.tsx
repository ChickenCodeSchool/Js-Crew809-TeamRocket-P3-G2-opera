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
  birthday?: string;
  postal_code?: string;
  adress?: string;
  country?: string;
  phone?: string;
  created_at?: string;
  uptaded_at?: string;
};

export type Auth = {
  user: User;
  token: string;
};

function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const [auth, setAuth] = useState<Auth | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: need to trigger on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar key={location.pathname} auth={auth} setAuth={setAuth} />
      <div className={!isLanding ? "with-fixed-navbar" : ""}>
        <Outlet context={{ auth, setAuth }} />
      </div>
      <Footer />
    </>
  );
}

export default App;
