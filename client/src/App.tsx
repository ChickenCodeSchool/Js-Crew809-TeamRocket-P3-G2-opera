import { Outlet } from "react-router";
import "./App.css";
import CollectionLp from "./components/collectionLp/CollectionLp";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
    <Navbar/>
      <CollectionLp />
      <Outlet />
      <Footer/>
    </>
  );
}

export default App;
