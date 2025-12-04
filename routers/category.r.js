import catC from "../controllers/category.c.js";
import express from 'express';
const router = express.Router();
router.get("/:id", catC.getAllProductsOfCategory);
router.get("/", catC.getCategories);
router.get("/select/:id", catC.getSelectCategory);
router.post("/add", catC.postCategory);
router.post("/update", catC.putCategory);
export default router;