import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./routes/index";
import ProductGroups from "./routes/product_groups";
import Products from "./routes/products";
import { Product, productLoader } from "./routes/product";
import "./index.css";
import Login from "./routes/login";
import { store } from './utils/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!); // eslint-disable-line

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "product-groups",
    element: <ProductGroups />,
  },
  {
    path: "products/:pgId",
    element: <Products />,
  },
  {
    path: "product/:pgId/:pId",
    element: <Product />,
    loader: productLoader,
  },
]);

root.render(
  <React.StrictMode>
    {/* https://redux-toolkit.js.org/tutorials/quick-start */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
