import Resume from "../models/resume.model.js"

export const createResume = async (req, res) => {
    try {
        const resume = await Resume.create({
            ...req.body,
            userId: req.user._id
        })

        return res.status(201).json({
            message: "Resume has been created",
            resume
        })
    }
    catch (error) {
        console.log("Error in createResume backend")
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getAllResume = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id })
        return res.status(200).json({
            message: "Resume has been fetched",
            resumes
        })
    }
    catch (error) {
        console.log("Error in getAllResume backend")
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.find({ userId: req.user._id , _id:req.params.id})
        return res.status(200).json({
            message: "Resume has been fetched",
            resume
        })
    }
    catch (error) {
        console.log("Error in getResumeById backend")
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        )

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }

        return res.status(200).json({
            message: "Resume has been updated",
            resume
        })
    }
    catch (error) {
        console.log("Error in updateResume backend")
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        })

        if(!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }

        return res.status(200).json({
            message: "Resume has been deleted",
        })
    }
    catch (error) {
        console.log("Error in deleteResume backend")
        return res.status(500).json({ message: "Internal server error" })
    }
}

