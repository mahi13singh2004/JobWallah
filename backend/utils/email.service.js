import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

export const sendEmail=async({to,subject,text})=>{
    try {
        await transporter.sendMail({
            from: `"Trackly" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        })
        console.log("Email has been sent")
    } 
    catch (error) {
        console.log("Error Sending Email",error.message)    
    }
}