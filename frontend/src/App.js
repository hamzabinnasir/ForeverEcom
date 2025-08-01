import "./App.css"
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Searchbar from "./components/Searchbar/Searchbar"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Cart from "./pages/Cart/Cart"
import About from "./pages/About/About"
import Collection from "./pages/Collection/Collection"
import Contact from "./pages/Contact/Contact"
import Order from "./pages/Order/Order"
import Product from "./pages/Product/Product"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Support from "./pages/Support/Support"
import Policy from "./pages/Policy/Policy"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Searchbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/policies" element={<Policy />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}