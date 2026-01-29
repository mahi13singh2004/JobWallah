import { create } from "zustand"
import axiosInstance from "../utils/axios.js"

export const useResumeStore = create((set, get) => ({
    resumes: [],
    currentResume: null,
    loading: false,
    error: null,

    createResume: async (data) => {
        try {
            set({ loading: true, error: null })
            const res = await axiosInstance.post("/api/resume", data)
            set({ currentResume: res.data.resume })
            return res.data.resume
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to create resume" })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    getResumes: async () => {
        try {
            set({ loading: true, error: null })
            const res = await axiosInstance.get("/api/resume")
            set({ resumes: res.data.resumes })
            return res.data.resumes
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to fetch resumes" })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    getResumeById: async (id) => {
        try {
            set({ loading: true, error: null })
            const res = await axiosInstance.get(`/api/resume/${id}`)
            set({ currentResume: res.data.resume })
            return res.data.resume
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to fetch resume" })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    updateResume: async (id, data) => {
        try {
            set({ loading: true, error: null })
            const res = await axiosInstance.put(`/api/resume/${id}`, data)
            set({ currentResume: res.data.resume })
            return res.data.resume
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to update resume" })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    deleteResume: async (id) => {
        try {
            set({ loading: true, error: null })
            await axiosInstance.delete(`/api/resume/${id}`)
            const { resumes } = get()
            set({ resumes: resumes.filter(r => r._id !== id) })
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to delete resume" })
            throw error
        } finally {
            set({ loading: false })
        }
    },

    downloadResume: async (data) => {
        try {
            const res = await axiosInstance.post("/api/resume/download", data, {
                responseType: 'blob'
            })
            return res.data
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to download resume" })
            throw error
        }
    }
}))