import React from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "../pages/hero/Hero";
import Layout from "../layouts/Layout";
import Cart from "../pages/cartPage/Cart";
import ProductDetails from "../pages/productDetails/ProductDetails";
import Account from "../pages/account/Account";
import AccountInformation from "../pages/account/AccountInformation";
import ManageAddress from "../pages/account/ManageAddress";
import OrderPage from "../pages/orderPage/OrderPage";
import Wishlist from "../pages/account/Wishlist";
import OrderDetails from "../pages/orderDetails/OrderDetails";
import Product from "../pages/product/Product";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Logout from "../pages/auth/Logout";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="logout" element={<Logout />} />
          <Route path="product_details/:id" element={<ProductDetails />} />
          <Route path="search/:search" element={<Product />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/viewcart" element={<Cart />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route
              path="order_details/:orderId/:productId"
              element={<OrderDetails />}
            />

            {/* <Route path="payment" element={<Checkout />} /> */}

            <Route path="/account" element={<Account />}>
              <Route index element={<AccountInformation />} />
              <Route path="addresses" element={<ManageAddress />} />
              <Route path="wishlist" element={<Wishlist />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
