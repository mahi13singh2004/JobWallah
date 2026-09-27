import express from "express"
import dotenv from "dotenv"
// Load environment variables FIRST before other imports
dotenv.config()

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
import healthRoutes from "./routes/health.route.js"
import paymentRoutes from "./routes/payment.route.js"
import { startReminder } from "./utils/reminder.job.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cookieParser())

// Allow both production and local origins
const allowedOrigins = [
    "https://jobwallah-frontend.onrender.com",
    "http://localhost:5173",
    "http://localhost:3000"
]

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true)
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
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
app.use("/api/payment", paymentRoutes)
app.use("/api", healthRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connectDB()
    startReminder()
})