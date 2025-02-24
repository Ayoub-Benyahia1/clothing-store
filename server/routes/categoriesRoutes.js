import express from "express"
import { createCategorie, deleteCategorie, getAllCategories, updateCategorie } from "../controllers/categoriesController.js";


const router = express.Router();

router.post("/add-category", createCategorie);
router.get("/all-categories", getAllCategories);
router.patch("/update-category", updateCategorie);
router.delete("/delete-category/:id", deleteCategorie);

export default router;
