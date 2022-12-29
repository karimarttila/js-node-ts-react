import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./routes/index";
import ProductGroups from "./routes/product_groups";
import Products from "./routes/products";
import "./index.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!); // eslint-disable-line

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "product-groups",
    element: <ProductGroups />,
  },
  {
    path: "products/:pgId",
    element: <Products />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
