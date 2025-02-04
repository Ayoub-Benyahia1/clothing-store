import express from "express"
import { createCategorie, deleteCategorie, getAllCategories, updateCategorie } from "../controllers/categoriesController.js";


const router = express.Router();

router.post("/add-categorie", createCategorie);
router.get("/all-categories", getAllCategories);
router.patch("/update-categorie", updateCategorie);
router.delete("/delete-categorie/:id", deleteCategorie);

export default router;
