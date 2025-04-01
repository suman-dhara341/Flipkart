import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import AdminNavbar from "../pages/admin/AdminNavbar";
import Login from "../pages/auth/Login";
import AddProduct from "../pages/admin/AddProduct";
import Products from "../pages/admin/Products";
import Order from "../pages/admin/Order";
import Profile from "../pages/admin/Profile";
import { useSelector } from "react-redux";
import ProductView from "../pages/admin/ProductView";

const AdminRouter = () => {
  const isAdmin = useSelector((state) => state?.profile?.auth?.isAdmin);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAdmin === false) {
      navigate("/");
    }
  }, [isAdmin]);

  if (isAdmin === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route path="/admin" element={<AdminNavbar />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="orders" element={<Order />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductView />} />
          <Route path="my-profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AdminRouter;
