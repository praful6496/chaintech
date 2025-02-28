import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    return <Navigate to="/login" />;
  }

  if (storedUser.role !== role) {
    return <Navigate to="/error" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
