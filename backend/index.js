import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import ordersRouter from "./routes/orderRoute.js";
import createRouter from "./routes/createRoute.js";

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://forever-ecom-frontend-nine.vercel.app",
  "https://forever-ecom-4pyd.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed from this origin"));
    }
  },
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization", "token"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Needed for preflight


connectDB();
connectCloudinary();

// Routes
app.get("/", (req, res) => {
    res.send("API Working");
});
app.use("/api/user", userRouter)
app.use("/api/product", productRouter) 
app.use("/api/cart", cartRouter)
app.use("/api/orders", ordersRouter)
app.use("/api", createRouter)

const port = process.env.PORT || 4000;
app.listen(port,() => {
    console.log(`http://localhost:${port}`);
});
