import express from "express"
import verifyToken from "../middlewares/verifyToken.js"
import { generateEmail } from "../controllers/aiEmail.controller.js"

const router = express.Router()

router.post("/generate", verifyToken, generateEmail)

export default router