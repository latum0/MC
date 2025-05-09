import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AccountPage from "./pages/AccountPage";

import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import PrivateAdminRoute from "./components/ui/PrivateAdminRoute";

import AdminLayout from "./admin/components/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Clients from "./admin/pages/Clients";
import Payments from "./admin/pages/Payments";
import Transactions from "./admin/pages/Transactions";

import "./App.css";

function LayoutWrapper() {
  const location = useLocation();

  const adminPaths = [
    "/dashboard",
    "/produits",
    "/commandes",
    "/clients",
    "/paiements",
    "/transactions"
  ];

  const isAdminRoute = adminPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/AccountPage" element={<AccountPage />} />

        {/* Admin Routes (Protected) */}
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
