import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  // biome-ignore lint/correctness/useExhaustiveDependencies: need to trigger on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar key={location.pathname} />
      <div className={!isLanding ? "with-fixed-navbar" : ""}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
