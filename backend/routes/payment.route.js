import express from "express"
import { createOrder, verifyPayment, getPaymentStatus } from "../controllers/payment.controller.js"
import verifyToken from "../middlewares/verifyToken.js"

const router = express.Router()

router.post("/create-order", verifyToken, createOrder)
router.post("/verify", verifyToken, verifyPayment)
router.get("/status", verifyToken, getPaymentStatus)

export default router