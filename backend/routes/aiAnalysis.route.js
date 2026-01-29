import express from "express"
import verifyToken from "../middlewares/verifyToken.js"
import upload from "../middlewares/upload.js"
import { analyzeResume } from "../controllers/aiAnalysis.controller.js"

const router = express.Router()

router.use(verifyToken)

router.post("/analyze", upload.single('resume'), analyzeResume)

export default router
