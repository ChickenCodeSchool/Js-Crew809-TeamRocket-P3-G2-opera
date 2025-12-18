import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
    <Navbar/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
    </>
  );
}

export default App;
