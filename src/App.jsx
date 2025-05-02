import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import AccountPage from "./pages/AccountPage";
import AdminLayout from "./admin/components/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Clients from "./admin/pages/Clients";
import Payments from "./admin/pages/Payments";
import Transactions from "./admin/pages/Transactions";
import PrivateAdminRoute from "./components/ui/PrivateAdminRoute";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import "./App.css";

import { useEffect } from "react";

function LayoutWrapper() {
  const location = useLocation();
  
  // Liste des routes admin
  const adminPaths = [
    "/dashboard",
    "/produits",
    "/commandes",
    "/clients",
    "/paiements",
    "/transactions"
  ];

  // Vérifie si on est dans une route admin
  const isAdminRoute = adminPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/AccountPage" element={<AccountPage />} />

        {/* Routes admin */}
        <Route
          element={
            <PrivateAdminRoute>
              <AdminLayout />
            </PrivateAdminRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/produits" element={<Products />} />
          <Route path="/commandes" element={<Orders />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/paiements" element={<Payments />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
