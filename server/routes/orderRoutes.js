import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/all-orders", getAllOrders);
router.get("/get-order/:id", getOrderById);
router.patch("/update-order-status/:id", updateStatus);
router.delete("/:id", deleteOrder);

export default router;
