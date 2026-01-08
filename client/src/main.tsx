import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Footer from "./components/Footer/Footer";
import CarouselLp from "./components/carouselLp/carouselLp";
import BrandPage from "./pages/BrandPage";
import HomePage from "./pages/HomePage";
import PageTestLink from "./pages/pageTestLinkBurger/PageTestLink";
import BrandCategory from "./pages/BrandCategory/BrandCategory";

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
        path: "/book",
        element: <BrandPage />,
      },
      {
        path: "/login",
        element: <PageTestLink />,
      },
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
        path: "/brand/:id",
        element: <PageTestLink />,
      },
      {
        path: "/brand/category/:brandId",
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
