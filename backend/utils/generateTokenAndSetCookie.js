import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const generateTokenAndSetCookie=async(id,res)=>{
    try {
        const token=jwt.sign({id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        })
        res.cookie("token",token,{
            httpOnly:true,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === "production",
            maxAge:7*24*60*60*1000
        })
        return token
    } 
    catch (error) {
        console.log("Error in generating and setting cookie",error)
        return res.status(500).json({message:"Internal server erorr"})    
    }
}

export default generateTokenAndSetCookie