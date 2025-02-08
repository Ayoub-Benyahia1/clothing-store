import express from "express";
import { createReview, getAllReviews, getReviewById } from "../controllers/reviewsController.js";


const router = express.Router();

router.post("/create-review", createReview);
router.get("/all-reviews", getAllReviews);
router.get("/get-reviews/:id", getReviewById)

export default router;
