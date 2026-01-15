import { useState, useEffect } from "react";
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
  const [auth, setAuth] = useState<Auth | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: need to trigger on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar auth={auth} setAuth={setAuth} />
      <Outlet context={{ auth, setAuth }} />
      <Footer />
    </>
  );
}

export default App;
