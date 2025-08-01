import "./cart.css"
import React, { useContext, useEffect, useState } from "react"
import shopContext from "../../context/shopContext"
import CartTotal from "../../components/CartTotal/CartTotal"
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title/Title"
import { assets } from "../../assets/assets"
export default function Cart() {
    const { products, currency, cartItems, updateQuantity } = useContext(shopContext);
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const tempData = [];
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item],
                    })
                }
            }
        }
        setCartData(tempData);
    }, [cartItems, products]);

    return (
        <>
            <div className="cartSection">
                <div className="cartTitle">
                    <Title text1={"Your"} text2={"cart"} />
                </div>
                <div className="cartContainer">
                    {
                        cartData.map((item, index) => {
                            const productData = products.find((product) => product._id === item._id);
                            return (
                                <div key={index} className="cartItem">
                                    <div className="cartFirstContext">
                                        <img src={productData.image[0]} alt="no img" />
                                        <div className="nameAndSize">
                                            <p className="cartName">{productData.name}</p>
                                            {/* <p>{productData.price * item.quantity}</p> */}
                                            <div className="priceAndSize">
                                                <p className="cartPrice">{currency}{productData.price}</p>
                                                <div className="cartSizeBtn">{item.size}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="quantity">
                                        <input type="number" value={item.quantity} onChange={(e) => e.target.value === "" || e.target.value === 0 ? null : updateQuantity(item._id, item.size, Number(e.target.value))} />
                                    </div>
                                    <div className="delBtnDiv">
                                        <button id="deleteBtn" onClick={() => updateQuantity(item._id, item.size, 0)}><img src={assets.bin_icon} alt="no img" /></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <CartTotal />
                <div className="checkOutDiv">
                    <button onClick={() => navigate("/placeorder")} id="proceedToCheckout">proceed to checkout</button>
                </div>
            </div>
        </>
    )
}
