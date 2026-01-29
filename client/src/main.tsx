import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import AdminOrderEdit from "./components/AdminOrderEdit/AdminOrderEdit";
import Footer from "./components/Footer/Footer";
import ForgotPassword from "./components/MdpOublie/forgotpassword";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProducts from "./components/admin/admin_categorie/admin_product";
import CarouselLp from "./components/carouselLp/carouselLp";
import { CartProvider } from "./contexts/CartContext";
import AddProduct from "./pages/AddProduct/AddProduct";
import AdminPage from "./pages/Admin/AdminPage";
import ArticlePage from "./pages/ArticlePage/articlePage";
import BrandCategory from "./pages/BrandCategory/BrandCategory";
import BrandPage from "./pages/BrandPage";
import Cart from "./pages/Cart/Cart";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/HomePage";
import MyOrderDetailPage from "./pages/MyOrderDetailPage/MyOrderDetailPage";
import MyOrderPage from "./pages/MyOrderPage/MyOrderPage";
import Profile from "./pages/Profile/Profile";
/*import Clients from "./pages/Admin/pages/Clients";*/
import ProtectedExample from "./pages/ProtectedExample/ProtectedExample";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
/*import Register from "./components/register/Register";*/
import Authentification from "./pages/authentification/Authentification";
import Contact from "./pages/contactPage/contact";
import PageTestLink from "./pages/pageTestLinkBurger/PageTestLink";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/brand/:id", element: <BrandPage /> },
      { path: "/auth", element: <Authentification /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/protected",
        element: (
          <ProtectedRoute>
            <ProtectedExample />
          </ProtectedRoute>
        ),
      },
      { path: "/newproduct", element: <AddProduct /> },
      { path: "/orders", element: <MyOrderPage /> },
      { path: "/orders/:id", element: <MyOrderDetailPage /> },
      { path: "/contact", element: <PageTestLink /> },
      { path: "/panier", element: <Cart /> },
      {
        path: "/brand/:brandId/category/:categoryId",
        element: <BrandCategory />,
      },
      { path: "/carousel", element: <CarouselLp /> },
      { path: "/footer", element: <Footer /> },
      { path: "/brand/:brandId/products/:productId", element: <ArticlePage /> },
      { path: "/nouscontacter", element: <Contact /> },

      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
        children: [
          { path: "", element: <Dashboard /> },
          { path: "orders", element: <AdminOrderEdit /> },
          /* { path: "clients", element: <Clients /> },   */
        ],
      },
      {
        path: "adminproducts",
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
        children: [{ path: "", element: <AdminProducts /> }],
      },
      { path: "/forgot-password", element: <ForgotPassword /> },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement)
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);

createRoot(rootElement).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
