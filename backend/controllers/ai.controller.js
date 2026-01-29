import { improveResumeContent, improveSummary } from "../utils/gemini.js"

export const improveContent = async (req, res) => {
    try {
        const { content, numberOfPoints } = req.body

        if (!content) {
            return res.status(400).json({ message: "Content is required" })
        }

        if (!numberOfPoints || numberOfPoints < 1 || numberOfPoints > 10) {
            return res.status(400).json({ message: "Number of points must be between 1 and 10" })
        }

        const improvedPoints = await improveResumeContent(content, numberOfPoints)

        return res.status(200).json({
            message: "Content improved successfully",
            points: improvedPoints
        })
    } catch (error) {
        console.log("Error in improveContent:", error)
        return res.status(500).json({ message: error.message || "Internal server error" })
    }
}

export const improveSummaryText = async (req, res) => {
    try {
        const { content } = req.body

        if (!content) {
            return res.status(400).json({ message: "Content is required" })
        }

        const improvedSummary = await improveSummary(content)

        return res.status(200).json({
            message: "Summary improved successfully",
            summary: improvedSummary
        })
    } catch (error) {
        console.log("Error in improveSummaryText:", error)
        return res.status(500).json({ message: error.message || "Internal server error" })
    }
}
