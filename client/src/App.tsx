import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import BrandHero from "./components/brandHero/BrandHero";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <BrandHero
          brandName="LOUIS VUITTON"
          // Ici, utilise le chemin vers ta photo dans le dossier public
          backgroundImage="/assets/images/ProductImage/louis vuitton/votre_image_fond.webp"
          // Ici, ton logo démo (optionnel selon ton Figma)
        />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
