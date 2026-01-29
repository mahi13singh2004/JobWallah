import express from "express"
import { createApplication, deleteApplication, getApplication, getApplicationById, updateApplication } from "../controllers/application.controller.js"
const router=express.Router()
import verifyToken from "../middlewares/verifyToken.js"

router.post("/",verifyToken,createApplication)
router.get("/",verifyToken,getApplication)
router.get("/:id",verifyToken,getApplicationById)
router.put("/:id",verifyToken,updateApplication)
router.delete("/:id",verifyToken,deleteApplication)

export default router