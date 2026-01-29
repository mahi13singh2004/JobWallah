import mongoose from "mongoose"

const reminderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    application:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Application",
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    remindAt:{
        type:Date,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    emailSent:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
)

const Reminder=mongoose.model("Reminder",reminderSchema)
export default Reminder