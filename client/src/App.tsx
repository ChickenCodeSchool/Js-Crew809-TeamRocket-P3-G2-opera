import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import BrandHero from "./components/brandHero/BrandHero";

function App() {
  return (
    <>
      <Navbar />
      <BrandHero brandName={"Louis Vuitton"} backgroundImage={"Lv"} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
