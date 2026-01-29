import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const verifyToken=async(req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token) return res.status(401).json({message:"No Token"})
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decoded.id)
        if(!user){
            return res.status(401).json({message:"Unauthorised"})
        }
        req.user=user
        next()
    } 
    catch (error) {
        console.log("Error in verifyToken",error)
        return res.status(500).json({message:"Internal server error"})    
    }
}

export default verifyToken