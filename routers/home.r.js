import express from "express";
import {
  getAllProductsAndCategories,
  getPaginatedProductsAndCategories,
  getAjaxPage,
  postAjaxPage,
} from "../controllers/home.c.js";

const router = express.Router();

// Route cho trang chủ
router.get("/", getAllProductsAndCategories);

// Route cho phân trang AJAX
router.get("/ajax", getAjaxPage);
router.post("/ajax", postAjaxPage);

// Route cho phân trang thường
router.get("/:page", getPaginatedProductsAndCategories);

export default router;
