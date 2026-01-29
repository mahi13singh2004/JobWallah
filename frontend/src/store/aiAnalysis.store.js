import { create } from "zustand"
import axiosInstance from "../utils/axios.js"

export const useAIAnalysisStore = create((set) => ({
    analysis: null,
    loading: false,
    error: null,

    analyzeResume: async (resumeFile, jobDescription) => {
        try {
            set({ loading: true, error: null, analysis: null })

            const formData = new FormData()
            formData.append('resume', resumeFile)
            formData.append('jobDescription', jobDescription)

            const res = await axiosInstance.post("/api/ai-analysis/analyze", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            set({ analysis: res.data.analysis })
            return res.data.analysis
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to analyze resume" })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    clearAnalysis: () => {
        set({ analysis: null, error: null })
    }
}))
