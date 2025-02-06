import express from "express";
import { allProductVariations, createProductVariations, deleteProductVariations, filterProductVariations, getProductVariationsById, updateProductVariations } from "../controllers/productVariationsController.js";

const router = express.Router();

router.post("/add-product-variations", createProductVariations);
router.get("/filter-product-variations", filterProductVariations);
router.get("/all-product-variations", allProductVariations);
router.get("/:id", getProductVariationsById);
router.patch("/update-product-variations/:id", updateProductVariations);
router.delete("/:id", deleteProductVariations);

export default router;

