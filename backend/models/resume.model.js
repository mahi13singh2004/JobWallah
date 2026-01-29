import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        default: "My Resume"
    },
    personalInfo: {
        name: String,
        email: String,
        phone: String,
        location: String,
        linkedin: String,
        github: String
    },
    summary: String,
    education: [{
        institution: String,
        degree: String,
        location: String,
        startDate: String,
        endDate: String
    }],
    experience: [{
        role: String,
        company: String,
        location: String,
        startDate: String,
        endDate: String,
        bullets: [String]
    }],
    projects: [{
        name: String,
        techStack: [String],
        startDate: String,
        endDate: String,
        bullets: [String]
    }],
    skills: {
        languages: [String],
        frameworks: [String],
        aiTools: [String],
        databases: [String],
        coreCS: [String]
    },
    achievements: [String]
}, {
    timestamps: true
})

const Resume = mongoose.model("Resume", resumeSchema)
export default Resume