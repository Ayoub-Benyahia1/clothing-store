import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import colorsRoutes from "./routes/colorRoutes.js";
import sizesRoutes from "./routes/sizeRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import orderItemsRoutes from "./routes/orderItemsRoutes.js";
import productVariationsRoutes from "./routes/productVariationsRoutes.js";
import payementsRoutes from "./routes/payementsRoutes.js";
import reviewsRoutes from "./routes/reviewsRoutes.js";

dotenv.config();
const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 200, // Increased limit
  message: "Too many requests, please try again later",
});
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/colors", colorsRoutes);
app.use("/api/sizes", sizesRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemsRoutes);
app.use("/api/product-variations", productVariationsRoutes);
app.use("/api/payements", payementsRoutes);
app.use("/api/reviews", reviewsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
