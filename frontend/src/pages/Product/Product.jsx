import "./product.css";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import shopContext from "../../context/shopContext";
import { assets } from "../../assets/assets";

export default function Product() {
  const { backendURL, currency, addToCart } = useContext(shopContext);
  const { productId } = useParams();
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [findProduct, setFindProduct] = useState(null); // Default to null

  // Fetch product data
  const findingSingleProduct = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/product/single`, { productId });
      if (response.data.success) {
        setFindProduct(response.data.message);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Call API on component mount
  useEffect(() => {
    findingSingleProduct();
  }, [productId]); // Ensure this runs only when productId changes

  // Render the component only when findProduct is available
  if (!findProduct) {
    return <p>Loading product...</p>; // Handle loading state
  }

  return (
    <div className="productPage">
      <div className="productSection">
        {/* Product Left */}
        <div className="productLeft">
          <div className="imgGrid">
            {findProduct.image?.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                src={item}
                alt="Product"
              />
            ))}
          </div>
          <div className="mainImg">
            <img
              src={image || findProduct.image[0]}
              alt="Selected Product"
            />
          </div>
        </div>

        {/* Product Right */}
        <div className="productRight">
          <h2 className="productName">{findProduct.name}</h2>
          <div className="starDiv">
            <div className="images">
              {Array(4).fill().map((_, i) => (
                <img key={i} src={assets.star_icon} alt="Star" />
              ))}
              <img src={assets.star_dull_icon} alt="Dull Star" />
            </div>
            <span>(122)</span>
          </div>
          <h2 className="productPrice">
            {currency}{findProduct.price}
          </h2>
          <p className="priceDesc">{findProduct.description}</p>

          {/* Size Selector */}
          <div className="sizeContainer">
            <h3>Select Size</h3>
            <div className="sizButtonDiv">
              {findProduct.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={item === size ? "sizeBtn border" : "sizeBtn"}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            id="adToCart"
            onClick={() => addToCart(findProduct._id, size)}
          >
            Add to Cart
          </button>
          <hr className="boundary" />
          <div className="context">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
