import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Login from './pages/Login'; 
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import AccountPage from './pages/AccountPage';


import Dashboard from "./pages/seller/Dashboard"
import Products from "./pages/seller/SellerProducts"
import AddProduct from "./pages/seller/AddProduct"
import EditProduct from "./pages/seller/EditProduct"
import Orders from "./pages/seller/Orders"
import OrderDetails from "./pages/seller/OrderDetails"
import Inventory from "./pages/seller/Inventory"
import Analytics from "./pages/seller/Analytics"
import AdminProfile from "./pages/seller/AdminProfile"


function App() {
 
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/account" element={<AccountPage />} />



        {/*<Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/Adminproducts/:id/edit" element={<EditProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/profile" element={<AdminProfile />} />*/}



      </Routes>


      {/*<Footer />*/}
    </Router>
  );
}

export default App;