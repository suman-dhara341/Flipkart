import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isUser = localStorage.getItem("Id");

  return isUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
