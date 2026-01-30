import { analyzeResumeVsJD } from "../utils/geminiAnalysis.js"
import { extractTextFromPDF } from "../utils/pdfExtractor.js"

export const analyzeResume = async (req, res) => {
    try {
        const { jobDescription } = req.body

        if (!req.file) {
            return res.status(400).json({ message: "Resume PDF is required" })
        }

        if (!jobDescription) {
            return res.status(400).json({ message: "Job description is required" })
        }

        const pdfBuffer = req.file.buffer
        const resumeText = await extractTextFromPDF(pdfBuffer)

        if (!resumeText.trim()) {
            return res.status(400).json({ message: "Could not extract text from PDF" })
        }

        const analysis = await analyzeResumeVsJD(resumeText, jobDescription)

        return res.status(200).json({
            message: "Analysis completed successfully",
            analysis
        })
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" })
    }
}
