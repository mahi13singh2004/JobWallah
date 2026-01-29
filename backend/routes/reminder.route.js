import express from "express"
const router = express.Router()
import verifyToken from "../middlewares/verifyToken.js"
import { createReminder, getReminder, getReminderByApplication, updateReminder, deleteReminder } from "../controllers/reminder.controller.js"

router.use(verifyToken)
router.post("/", createReminder)
router.get("/", getReminder)
router.get("/application/:appId", getReminderByApplication)
router.put("/:id", updateReminder)
router.delete("/:id", deleteReminder)

export default router