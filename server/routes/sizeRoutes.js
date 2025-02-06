import express from "express";
import { createSize, deleteSize, getAllSizes, updateSize } from "../controllers/sizeController.js";

const router = express.Router();

router.post("/create-size", createSize);
router.get("/all-sizes", getAllSizes);
router.patch("/update-size", updateSize);
router.delete("/:id", deleteSize);

export default router;
