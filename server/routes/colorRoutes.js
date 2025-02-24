import express from "express";
import { createColor, deleteColor, getAllColors, updateColor } from "../controllers/colorsController.js";

const router = express.Router();

router.post("/add-color", createColor);
router.get("/all-colors", getAllColors);
router.patch("/update-color", updateColor);
router.delete("/:id", deleteColor);

export default router;
