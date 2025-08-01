import React, { useState, useEffect } from "react";
import axios from "axios";
import shopContext from "./shopContext";
import { toast } from "react-toastify";
// import { products } from "../assets/assets";

export default function ShopContextProvider({ children }) {
  const [cartItems, setCartItem] = useState({});
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [token, setToken] = useState("");
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const currency = "$";
  const delivery_fee = 10;

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (!size) {
      toast.error("Please Select Size");
      return;
    }
    if (cartItems[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData);

    if (token) {
      try {
        const response = await axios.post(backendURL + "/api/cart/add", { itemId, size }, { headers: { token: token } })
        if (!response.data.success) {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if (token) {
      try {
        axios.post(backendURL + "/api/cart/update", { itemId, size, quantity }, { headers: { token: token } });

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getUserCartData = async (token) => {
    try {
      const response = await axios.post(backendURL + "/api/cart/get", {}, { headers: { token: token } });
      if (response.data.success) {
        setCartItem(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const getProducts = async () => {
    try {
      const response = await axios.get(backendURL + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCart = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };


  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCartData(localStorage.getItem("token"));
    }
  }, [token]);

  const contextVal = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItem,
    addToCart,
    getTotalCart,
    updateQuantity,
    getCartAmount,
    backendURL,
    token,
    setToken,
  };

  return <shopContext.Provider value={contextVal}>{children}</shopContext.Provider>;
}
