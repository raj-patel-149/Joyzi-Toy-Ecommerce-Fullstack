import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import ToyStore from "./Store/index.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Componnents/Homepage/HomePage.jsx";
import AboutUs from "./Componnents/AboutUs Page/AboutUs .jsx";
import CartPage from "./Componnents/CartPage/cartPage.jsx";
import ProductList2 from "./Componnents/ProducPage/ProductList2.jsx";
import ClickProduct from "./Componnents/ProductClick/ClickProduct.jsx";
import SignUp from "./Componnents/LogIn-signUp/SignUp.jsx";
import LogIn from "./Componnents/LogIn-signUp/LogIn.jsx";
import BuyNow from "./Componnents/Buy/BuyNow.jsx";
import CartBuy from "./Componnents/Buy/CartBuy.jsx";
import MakePayment from "./Componnents/Buy/MakePayment.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/", element: <SignUp /> },
      { path: "/login", element: <LogIn /> },
      { path: "/productpage", element: <ProductList2 /> },
      { path: "/productInfo", element: <ClickProduct /> },
      { path: "/buyNow", element: <BuyNow /> },
      { path: "/cartBuy", element: <CartBuy /> },
      { path: "/makePayment", element: <MakePayment /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={ToyStore}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
