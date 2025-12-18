import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import CollectionLp from "./components/collectionLp/CollectionLp";

function App() {
  return (
    <>
      <Navbar />
      <CollectionLp />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
