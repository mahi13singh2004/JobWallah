import mongoose from "mongoose"

const resumeSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    education:[
        {
            institution:String,
            degree:String,
            location:String,
            startDate:String,
            endDate:String
        },
    ],
    experience: [
        {
            role: String,
            company: String,
            location: String,
            startDate: String,
            endDate: String,
            bullets: [String],
        },
    ],
    projects: [
        {
            name: String,
            techStack: [String],
            startDate: String,
            endDate: String,
            bullets: [String],
        },
    ],
    skills: {
        languages: [String],
        frameworks: [String],
        aiTools: [String],
        databases: [String],
        coreCS: [String],
    },
    achievements: [String],
},
{timestamps:true}
)

const Resume=new mongoose.model("Resume",resumeSchema)
export default Resume