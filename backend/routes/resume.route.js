import express from "express"
const router=express.Router()
import verifyToken from "../middlewares/verifyToken.js"
import {createResume,getAllResume,getResumeById,updateResume,deleteResume} from "../controllers/resume.controller.js"

router.use(verifyToken)

router.post("/createResume",createResume)
router.get("/",getAllResume)
router.get("/:id",getResumeById)
router.put("/:id",updateResume)
router.delete("/:id",deleteResume)

export default router