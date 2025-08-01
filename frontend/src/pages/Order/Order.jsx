import "./order.css"
import axios from "axios"
import { toast } from "react-toastify"
import React, { useContext, useEffect, useState } from "react"
import Title from "../../components/Title/Title"
import shopContext from "../../context/shopContext"
export default function Order() {
    const { currency, token, backendURL } = useContext(shopContext);
    const [orderData , setOrderData] = useState([]);
    const loadOrdersData = async () => {
        try {
            if (!token) {
                return null;
            }
            const response = await axios.post(backendURL + "/api/orders/userorders", {}, { headers: { token: token } })
            if (response.data.success) {
                console.log(response.data.orders);
                let allOrdersItems = [];
                response.data.orders.map((order) =>{
                    order.items.map((item) =>{
                        item["status"] = order.status
                        item["payment"] = order.payment
                        item["paymentMethod"] = order.paymentMethod
                        item["date"] = order.date
                        allOrdersItems.push(item);
                    })
                })
                setOrderData(allOrdersItems.reverse());
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        loadOrdersData();
    }, [token]);
    return (
        <>
            <div className="orderSection">
                <div className="orderParent">
                    <Title text1={"my"} text2={"orders"} />
                    <div className="ordersContainer">
                        {
                            orderData.map((product, index) =>
                                <div key={index} className="order">
                                    {/* Order Context */}
                                    <div className="orderContext orderDiv">
                                        <img src={product.image[0]} alt="no img" />
                                        <div className="orderDetails">
                                            <p className="orderName">{product.name}</p>
                                            <div className="orderPriceQuantSize">
                                                <p className="orderPrice">{currency}{product.price}</p>
                                                <p className="orderPara">Quantity: {product.quantity}</p>
                                                <p className="orderPara">Size: {product.size}</p>
                                            </div>
                                            <p className="orderDate">Date: <span>{new Date(product.date).toDateString()}</span></p>
                                            <p className="orderDate">Payment: <span>{product.paymentMethod}</span></p>
                                        </div>
                                    </div>
                                    {/* Reday to Ship */}
                                    <div className="readyToShip">
                                        <div className="orderCirlce"></div>
                                        <p>{product.status}</p>
                                    </div>
                                    {/* Track Order Button */}
                                    <button onClick={loadOrdersData} id="trackOrder">Track Order</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}