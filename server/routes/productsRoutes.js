import express from "express";
import { allProducts, createProduct, deleteProduct, filterProducts, getProductById, specificProductFields, updateProduct } from "../controllers/productsController.js";

const router = express.Router();

router.post("/add-product", createProduct);
router.get("/specific-fields", specificProductFields);
router.get("/filter", filterProducts);
router.get("/all-products", allProducts);
router.get("/:id", getProductById);
router.patch("/update-product/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;

