import express from "express"
import verifyToken from "../middlewares/verifyToken.js"
import {
    createResume,
    getResumes,
    getResumeById,
    updateResume,
    deleteResume,
    downloadResumePDF
} from "../controllers/resume.controller.js"

const router = express.Router()

router.use(verifyToken)

router.post("/", createResume)
router.get("/", getResumes)
router.get("/:id", getResumeById)
router.put("/:id", updateResume)
router.delete("/:id", deleteResume)
router.post("/download", downloadResumePDF)

export default router