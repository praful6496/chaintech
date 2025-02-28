import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthProvider";
import Header from "./components/Header";
import "./App.css"

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={<ProtectedRoute component={AdminPage} role="admin" />}
        />
        <Route
          path="/user"
          element={<ProtectedRoute component={UserPage} role="user" />}
        />
        <Route path="/error" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
