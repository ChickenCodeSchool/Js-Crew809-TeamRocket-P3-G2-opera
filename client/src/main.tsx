import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import BrandPage from "./pages/BrandPage";
import Footer from "./components/Footer/Footer";
import CarouselLp from "./components/carouselLp/carouselLp";
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
        path:"/book",
        element:<BrandPage/>
      }
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
