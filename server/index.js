import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
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

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
