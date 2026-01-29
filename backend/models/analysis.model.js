import mongoose from "mongoose";

const analysisSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    resumeText: String,
    jdText:String,
    inputHash:{
        type:String,
        unique:true,
        required:true
    },
    score:Number,
    strengthd:[String],
    imporvements:[String]
},
{timestamps:true}
)

const Analysis=mongoose.model("Analysis",analysisSchema)
export default Analysis
