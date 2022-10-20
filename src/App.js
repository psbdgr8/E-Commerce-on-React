import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./screens/Cart";
import Home from "./screens/Home";
import ProductDetail from "./screens/ProductDetail";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="details">
            <Route path=":id" element={<ProductDetail />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
