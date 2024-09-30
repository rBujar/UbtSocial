import express from "express";
import { getUser, updateUser, getUserByUsername} from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/", updateUser)
router.get("/findByUsername/:username", getUserByUsername); 




export default router;