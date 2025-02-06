import express from "express";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  updateCoupon,
} from "../controllers/couponController.js";

const router = express.Router();

router.post("/create-coupon", createCoupon);
router.get("/all-coupons", getAllCoupons);
router.patch("/update-coupon/:id", updateCoupon);
router.delete("/:id", deleteCoupon);

export default router;
