import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Footer from "./components/Footer/Footer";
import AdminProducts from "./components/admin/admin_categorie/admin_product";
/*import BrandHero from "./components/brandHero/BrandHero";*/
import CarouselLp from "./components/carouselLp/carouselLp";
import ArticlePage from "./pages/ArticlePage/articlePage";
import BrandCategory from "./pages/BrandCategory/BrandCategory";
import BrandPage from "./pages/BrandPage";
import HomePage from "./pages/HomePage";
import MyOrderDetailPage from "./pages/MyOrderDetailPage/MyOrderDetailPage";
import MyOrderPage from "./pages/MyOrderPage/MyOrderPage";
import Profile from "./pages/Profile/Profile";
/*import Register from "./components/register/Register";*/
import Authentification from "./pages/authentification/Authentification";
import Contact from "./pages/contactPage/contact";
/*import Login from "./components/login/Login";*/
import PageTestLink from "./pages/pageTestLinkBurger/PageTestLink";

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
        path: "/auth",
        element: <Authentification />,
      },
      /*
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },*/
      {
        path: "profile",
        element: <Profile />,
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
        element: <MyOrderPage />,
      },
      {
        path: "/orders/:id",
        element: <MyOrderDetailPage />,
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
        path: "/brand/:brandId/products/:productId",
        element: <ArticlePage />,
      },
      {
        path: "/nouscontacter",
        element: <Contact />,
      },
      {
        path: "/adminproducts",
        element: <AdminProducts />,
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
