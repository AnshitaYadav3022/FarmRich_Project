// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { SuppliesCartProvider } from "./context/SuppliesCartContext";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Marketplace from "./pages/Marketplace";
import Supplies from "./pages/Supplies";
import Detection from "./pages/Detection";
import Chatbot from "./pages/ChatBot";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import SuppliesCheckout from "./pages/SuppliesCheckout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      {/* Global Navbar */}
      <Navbar />

      {/* Wrap entire app with both cart providers so contexts are globally available */}
      <CartProvider>
        <SuppliesCartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            {/* Marketplace and Supplies */}
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/supplies" element={<Supplies />} />

            {/* Other Pages */}
            <Route path="/detection" element={<Detection />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Checkout Pages */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/supplies-checkout" element={<SuppliesCheckout />} />
          </Routes>
        </SuppliesCartProvider>
      </CartProvider>
    </>
  );
}

export default App;
