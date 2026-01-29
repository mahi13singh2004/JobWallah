import Application from "../models/application.model.js"
import buildEmailPrompt from "../utils/aiPrompt.js"
import generateFromAI from "../utils/geminiMail.js"

export const generateEmail = async (req, res) => {
    try {
        const { emailType, applicationId, customContext, manualCompany, manualRole } = req.body
        if (!emailType) {
            return res.status(400).json({ "message": "emailType is required" })
        }

        let jobData = {};

        if (applicationId) {
            const application = await Application.findOne({
                _id: applicationId,
                user: req.user._id
            })

            if (!application) {
                return res.status(400).json({ "message": "Application not found" })
            }

            jobData = {
                company: application.company,
                role: application.role,
                status: application.status
            }
        }
        else {
            jobData = {
                company: manualCompany,
                role: manualRole
            }
        }

        const prompt = await buildEmailPrompt({
            emailType,
            jobData,
            customContext
        })

        const aiResult = await generateFromAI(prompt)

        return res.status(200).json({
            emailBody: aiResult.emailBody
        })
    }
    catch (error) {
        console.log("Error in generateEmail backend", error.message)
        console.log(error)
        return res.status(500).json({ "message": "Internal Server Error" })
    }
}