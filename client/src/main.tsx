import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Footer from "./components/Footer/Footer";
/*import BrandHero from "./components/brandHero/BrandHero";*/
import CarouselLp from "./components/carouselLp/carouselLp";
import BrandCategory from "./pages/BrandCategory/BrandCategory";
import BrandPage from "./pages/BrandPage";
import HomePage from "./pages/HomePage";
import Contact from "./pages/contactPage/contact";
import PageTestLink from "./pages/pageTestLinkBurger/PageTestLink";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/brand/:id",
        element: <BrandPage />,
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      },
      {
        path:"profile",
        element:<Profile/>
      },
      
   /*   {
        path: "/login",
        element: <PageTestLink />,
      },
      {
        path:"/register",
        element: 
      },
      {

      },*/
      {
        path: "/orders",
        element: <PageTestLink />,
      },
      {
        path: "/contact",
        element: <PageTestLink />,
      },
      {
        path: "/cart",
        element: <PageTestLink />,
      },
      {
        path: "/brand/:brandId/category/:categoryId",
        element: <BrandCategory />,
      },
      {
        path: "/carousel",
        element: <CarouselLp />,
      },
      {
        path: "/footer",
        element: <Footer />,
      },
      {
        path: "/nouscontacter",
        element: <Contact />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
