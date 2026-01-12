import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
