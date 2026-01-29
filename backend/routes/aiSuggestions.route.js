import express from "express"
import verifyToken from "../middlewares/verifyToken.js"
import { improveContent, improveSummaryText } from "../controllers/aiSuggestions.controller.js"

const router = express.Router()

router.use(verifyToken)

router.post("/improve-content", improveContent)
router.post("/improve-summary", improveSummaryText)

export default router
