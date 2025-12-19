import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

import App from "./App";
import HomePage from "./pages/HomePage";

// Import additional components for new routes
// Try creating these components in the "pages" folder
import Footer from "./components/Footer/Footer";
import CarouselLp from "./components/carouselLp/carouselLp";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/carousel", // New route for CarouselLp component
    element: <CarouselLp />,
  },
  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
  },
  {
    path: "/footer", // The root path
    element: <Footer />, // Renders the App component for the home page
  },
  // Try adding a new route! For example, "/about" with an About component
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
