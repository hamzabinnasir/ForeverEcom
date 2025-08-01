import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { generateSecureHash } from "../helpers/jazzCashHelper.js";
const placeOrders = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        if (!userId || !items || !amount || !address) {
            return res.json({ success: false, message: "All fields are required" });
        }
        const order = await orderModel.create({
            userId: userId,
            items: items,
            amount: amount,
            address: address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        });
        await order.save();
        userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


const placeOrderByPayoneer = async (req, res) => {
    try {
        const payeeEmail = address.email;
        const paymentRes = await axios.post(
            "https://api.sandbox.payoneer.com/v4/programs/your-program-id/payment-requests",
            {
                payee: { email: payeeEmail },
                amount: amount,
                currency: "USD",
                description: "Order payment via Payoneer",
                redirect_url: "https://yourwebsite.com/order"
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const payoneerPaymentLink = paymentRes.data.redirect_url;
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Internal Server Error" });
    }
}


const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


const getAllOrdersNoAuth = async (req, res) => {
    try {
        let allOrders = await orderModel.find();
        if (!allOrders) {
            return res.json({ success: false, message: "Orders not found" });
        }

        res.json({ success: true, allOrders });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Internal Server Error" });
    }
}

const deleteOrderById = async (req, res) => {
    try {
        const { orderId } = req.body;
        if (!orderId) {
            return res.json({ success: false, message: "Order id not found" });
        }
        await orderModel.findByIdAndDelete(orderId);
        let orders = await orderModel.find();
        res.json({ success: true, message: "Order Deleted Successfully", orders });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Internal Server Error" });
    }
}

export { placeOrders, allOrders, userOrders, updateStatus, getAllOrdersNoAuth, placeOrderByPayoneer, deleteOrderById };