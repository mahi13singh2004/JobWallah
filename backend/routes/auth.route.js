import express from "express"
import { getMe, login, logout, signup } from "../controllers/auth.controller.js"
import verifyToken from "../middlewares/verifyToken.js"
const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/me",verifyToken,getMe)

export default router