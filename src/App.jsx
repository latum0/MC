import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Login from './pages/Login'; 
import  Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
       { /*<Route path="/AccountPag" element={<AccountPage />} />*/}
              </Routes>
      <Footer />
    </Router>
  );
}

export default App;