import { create } from "zustand"
import axiosInstance from "../utils/axios.js"

axiosInstance.defaults.withCredentials = true

export const useAiEmailStore = create((set) => ({
    loading: false,
    emailResult: null,
    err: null,

    generateEmail: async (data) => {
        try {
            set({ loading: true, err: null })
            const res = await axiosInstance.post("/api/ai/generate", data)
            set({
                emailResult: res.data,
                loading: false
            })
        }
        catch (error) {
            set({
                err: error.response?.data?.message || "Failed to generate email",
                loading: false
            })
        }
    },

    clearEmailResult: () => {
        set({ emailResult: null, err: null })
    }
}))