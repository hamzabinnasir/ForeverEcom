import "./orders.css"
import { currency } from "../../App";
import axios from "axios"
import { toast } from "react-toastify"
import { backendURL } from "../../App";
import { assets } from "../../assets/assets";
import React, { useState, useEffect } from "react"
export default function Orders({ token }) {
    const [orders, setOrders] = useState([]);
    const fetchAllOrders = async () => {
        try {
            if (!token) {
                return null;
            }
            const response = await axios.post(backendURL + "/api/orders/list", {}, { headers: { "token": token } })
            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, [token])

    const updateStatus = async (event, orderId) => {
        try {
            const response = await axios.post(backendURL + "/api/orders/update", { orderId, status: event.target.value }, { headers: { token: token } })
            if (response.data.success) {
                await fetchAllOrders();
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }


    const handleDeleteOrder = async (orderId) => {
        return toast.error("You cannot delete this order for now");
        try {
            let response = await axios.post(`${backendURL}/api/orders/delete`, { orderId });
            if (response.data.success) {
                toast.success(response.data.message);
                setOrders(response.data.orders);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    return (
        <>
            <div className="orderSection">
                <h3>Order Page</h3>
                <div className="orderContainerParent">
                    {/* Order Container */}
                    {
                        orders.map((order, index) =>
                            <div key={index} className="orderContainer">
                                <div className="orderImgBox">
                                    <img src={assets.parcel_icon} alt="no img" />
                                </div>
                                <div className="ordersContext">
                                    {
                                        order.items.map((item, index) => {
                                            if (index === order.items.length - 1) {
                                                return <p className="orderNamePara" key={index}>{item.name} x <span>{item.quantity}</span><span>{item.size}</span></p>
                                            } else {
                                                return <p className="ordernamePara" key={index}>{item.name} x <span>{item.quantity} {item.size}</span>,</p>
                                            }
                                        })
                                    }
                                    <p className="orderName">{order.address.firstName + " " + order.address.lastName}</p>
                                    <p>{order.address.street}</p>
                                    <p>{order.address.city + " , " + order.address.state + " , " + order.address.country + " , " + order.address.zipCode}</p>
                                    <p>{order.address.phone}</p>
                                </div>
                                <div className="orderPaymentMethod">
                                    <p>Items: {order.items.length}</p>
                                    <p className="orderMethod">Method: {order.paymentMethod}</p>
                                    <p>Payment: Pending</p>
                                    <p>Date: {new Date(order.date).toDateString()}</p>
                                </div>
                                <div className="orderPrice">
                                    <p>{currency}{order.amount}</p>
                                </div>
                                <div className="selectDiv">
                                    <select onChange={(event) => updateStatus(event, order._id)} className="orderSelect">
                                        <option value="order Placed">Order Placed</option>
                                        <option value="Packing">Packing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    <img onClick={() => handleDeleteOrder(order?._id)} src={assets.cross_icon} alt="no img" />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )

}
