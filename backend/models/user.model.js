import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    jobSearchCount: {
        type: Number,
        default: 0
    },
    lastJobSearch: {
        type: Date,
        default: null
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    premiumPurchaseDate: {
        type: Date,
        default: null
    },
    razorpayOrderId: {
        type: String,
        default: null
    },
    razorpayPaymentId: {
        type: String,
        default: null
    }
},
    { timestamps: true }
)

const User = new mongoose.model("User", userSchema)
export default User