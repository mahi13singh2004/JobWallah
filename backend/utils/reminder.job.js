import cron from "node-cron"
import Reminder from "../models/reminder.model.js"
import {sendEmail} from "../utils/email.service.js"

export const startReminder=()=>{
    cron.schedule("*/5 * * * *",async()=>{
        try {
            const now=new Date()
            const reminders=await Reminder.find({
                remindAt:{$lte:now},
                completed:false,
                emailSent:false,
            }).populate("user","email")

            for( const reminder of reminders){
                if (!reminder.user?.email) continue;
                await sendEmail({
                    to:reminder.user.email,
                    subject:"Trackly Reminder",
                    text:`Reminder :${reminder.title}`
                })
                reminder.emailSent=true
                await reminder.save()
            }
        } 
        catch (error) {
            console.log("Error in cron job",error.message)    
        }
    })
}