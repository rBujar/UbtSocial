import express from "express";
import { login, register, logout, getLogin } from "../controllers/auth.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.get("/getLogin", getLogin)


export default router