import "./placeOrder.css"
import React, { useState, useContext } from "react"
import axios from "axios"
import shopContext from "../../context/shopContext"
import Title from "../../components/Title/Title"
import CartTotal from "../../components/CartTotal/CartTotal"
import { assets } from "../../assets/assets"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
export default function PlaceOrder() {
    const { backendURL, getCartAmount, token, cartItems, setCartItem, delivery_fee, products } = useContext(shopContext);
    const [method, setMethod] = useState("cod");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
    });

    const onchangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let orderItems = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    const itemInfo = structuredClone(products.find((product) => product._id === items));
                    if (itemInfo) {
                        itemInfo.size = item
                        itemInfo.quantity = cartItems[items][item]
                        orderItems.push(itemInfo)
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
            }

            switch (method) {
                case "cod":
                    let response = await axios.post(backendURL + "/api/orders/place", orderData, { headers: { token: token } });
                    if (response.data.success) {
                        setCartItem({});
                        navigate("/order")
                    } else {
                        toast.error(response.data.message);
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="placeOrderSection">
                <form onSubmit={onSubmitHandler} className="placeOrderParent">
                    <div className="placeOrderleft">
                        <div className="titleDiv2">
                            <Title text1={"delivery"} text2={"information"} />
                        </div>
                        <div className="deliveryForm">
                            <div className="inputFieldContainer">
                                <input required name="firstName" onChange={onchangeHandler} value={formData.firstName} type="text" placeholder="Fiest name" />
                                <input required name="lastName" onChange={onchangeHandler} value={formData.lastName} type="text" placeholder="Last name" />
                            </div>
                            <input required name="email" onChange={onchangeHandler} value={formData.email} type="email" placeholder="Email address" />
                            <input required name="street" onChange={onchangeHandler} value={formData.street} type="text" placeholder="Street" />
                            <div className="inputFieldContainer">
                                <input name="city" onChange={onchangeHandler} value={formData.city} type="city" placeholder="City" />
                                <input name="state" onChange={onchangeHandler} value={formData.state} type="text" placeholder="State" />
                            </div>
                            <div className="inputFieldContainer">
                                <input required name="zipCode" onChange={onchangeHandler} value={formData.zipCode} type="number" placeholder="Zipcode" />
                                <input required name="country" onChange={onchangeHandler} value={formData.country} type="text" placeholder="Country" />
                            </div>
                            <input required name="phone" onChange={onchangeHandler} value={formData.phone} type="phone" placeholder="Phone" />
                        </div>
                    </div>
                    <div className="placeorderRight">
                        <CartTotal />
                        {/* Placement Method */}
                        <div className="placementMethod">
                            <Title text1={"placemnet"} text2={"method"}></Title>
                            <div className="methodsContainer">
                                <div onClick={() => setMethod("cod")} className="cod method">
                                    <div className={method === "cod" ? "circle green" : "circle"}></div>
                                    <p>cash or delivery</p>
                                </div>
                                <div aria-disabled onClick={() => setMethod("payoneer")} className="stripe method">
                                    <div className={method === "payoneer" ? "circle green" : "circle"}></div>
                                    <img className="easyPaisaImg" src={assets.payoneer} alt="no img" />
                                </div>
                                <div aria-disabled onClick={() => setMethod("easyPaisa")} className="stripe method">
                                    <div className={method === "easyPaisa" ? "circle green" : "circle"}></div>
                                    <img className="easyPaisaImg" src={assets.easyPaisa} alt="no img" />
                                </div>
                            </div>
                            <div className="placeOrderDiv">
                                <button type="submit" id="placeOrderBtn">Plcae Order</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}