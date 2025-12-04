import express from "express";
import {
  renderLogin, // <--- Tên đúng là renderLogin
  renderRegister, // <--- Tên đúng là renderRegister
  postLogin,
  getLogout,
  postRegister,
} from "../controllers/auth.c.js";

const router = express.Router();

router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/logout", getLogout);
router.post("/login", postLogin);
router.post("/register", postRegister);

export default router;
