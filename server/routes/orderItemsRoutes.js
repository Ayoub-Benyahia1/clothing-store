import express from "express";
import { createOrderItem, deleteOrderItems, getAllOrderItems, getOrderItemsById } from "../controllers/orderItemsController.js";


const router = express.Router();

router.post("/create-order-item", createOrderItem);
router.get("/order-item/:id", getOrderItemsById);
router.get("/all-order-items", getAllOrderItems);
router.delete("/:id", deleteOrderItems);

export default router;
