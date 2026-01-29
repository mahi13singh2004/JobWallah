import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import resumeRoutes from "./routes/resume.route.js"
import aiSuggestionsRoutes from "./routes/aiSuggestions.route.js"
import aiAnalysisRoutes from "./routes/aiAnalysis.route.js"
import applicationRoutes from "./routes/application.route.js"
import reminderRoutes from "./routes/reminder.route.js"
import aiEmailRoutes from "./routes/aiEmail.route.js"
import jobSearchRoutes from "./routes/jobSearch.route.js"
import { startReminder } from "./utils/reminder.job.js"

import cors from "cors"
const app = express()
dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth", authRoutes)
app.use("/api/resume", resumeRoutes)
app.use("/api/ai-suggestions", aiSuggestionsRoutes)
app.use("/api/ai-analysis", aiAnalysisRoutes)
app.use("/api/application", applicationRoutes)
app.use("/api/reminder", reminderRoutes)
app.use("/api/ai", aiEmailRoutes)
app.use("/api/jobs", jobSearchRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connectDB()
    startReminder()
    console.log(`Server is running at ${PORT}`)
})