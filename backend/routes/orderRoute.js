import express from "express"
const ordersRouter = express.Router();
import { placeOrders, allOrders, userOrders, updateStatus, getAllOrdersNoAuth, placeOrderByPayoneer, deleteOrderById } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/auth.js";

// Admin Features
ordersRouter.post("/list", adminAuth, allOrders);
ordersRouter.get("/all", getAllOrdersNoAuth);
ordersRouter.post("/status", adminAuth, updateStatus);

// Payment Features
ordersRouter.post("/place", userAuth, placeOrders);
ordersRouter.post("/payoneer", userAuth, placeOrderByPayoneer);
ordersRouter.post("/delete", deleteOrderById);
ordersRouter.post("/jazzCash", userAuth,);
// ordersRouter.post("/razorpay", placeOrdersRazorpay);
ordersRouter.post("/update" , adminAuth ,updateStatus )

// User Features
ordersRouter.post("/userorders", userAuth, userOrders);

export default ordersRouter;