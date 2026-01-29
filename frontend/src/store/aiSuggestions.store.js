import { create } from "zustand"
import axiosInstance from "../utils/axios.js"

export const useAISuggestionsStore = create((set) => ({
    loading: false,
    error: null,

    improveContent: async (content, numberOfPoints) => {
        try {
            set({ loading: true, error: null })
            const res = await axiosInstance.post("/api/ai-suggestions/improve-content", { content, numberOfPoints })
            return res.data.points
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to improve content" })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    improveSummary: async (content) => {
        try {
            set({ loading: true, error: null })
            const res = await axiosInstance.post("/api/ai-suggestions/improve-summary", { content })
            return res.data.summary
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to improve summary" })
            throw error
        } finally {
            set({ loading: false })
        }
    }
}))
