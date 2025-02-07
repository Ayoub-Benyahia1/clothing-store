import express from "express";
import {
  createPayements,
  getAllPayements,
} from "../controllers/payementsController.js";

const router = express.Router();

router.post("/create-payement", createPayements);
router.get("/all-payements", getAllPayements);

export default router;
