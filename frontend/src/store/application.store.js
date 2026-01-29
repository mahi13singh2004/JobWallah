import { create } from "zustand"
import axiosInstance from "../utils/axios.js"

axiosInstance.defaults.withCredentials = true

export const useApplicationStore = create((set) => ({
    applications: [],
    loading: false,
    err: null,

    createApplication: async (data) => {
        try {
            set({ loading: true, err: null })
            const res = await axiosInstance.post("/api/application", data)
            set((state) => ({
                applications: [res.data.application, ...state.applications]
            }))
            return true
        }
        catch (error) {
            set({
                err: error.response.data.message || "Failed To Create Application",
            })
        }
        finally {
            set({ loading: false })
        }
    },

    getApplications: async () => {
        try {
            set({ loading: true, err: null })
            const res = await axiosInstance.get("/api/application")
            set({ applications: res.data.applications })
        }
        catch (error) {
            set({
                err: error.response.data.message || "Failed To Fetch Application",
            })
        }
        finally {
            set({ loading: false })
        }
    },

    getApplicationById: async (id) => {
        try {
            set({ loading: true, err: null })
            const res = await axiosInstance.get(`/api/application/${id}`)
            return res.data.application
        }
        catch (error) {
            set({
                err: error.response.data.message || "Failed To Fetch Application",
            })
        }
        finally {
            set({ loading: false })
        }
    },

    updateApplication: async (id, data) => {
        try {
            set({ loading: true, err: null })
            const res = await axiosInstance.put(`/api/application/${id}`, data)
            set((state) => ({
                applications: state.applications.map(app => app._id === id ? res.data.updatedApplication : app)
            }))

            return true
        }
        catch (error) {
            set({
                err: error.response.data.message || "Failed To Update Application",
            })
        }
        finally {
            set({ loading: false })
        }
    },

    deleteApplication: async (id) => {
        try {
            set({ loading: true, err: null })
            await axiosInstance.delete(`/api/application/${id}`)
            set((state) => ({
                applications: state.applications.filter(
                    (app) => app._id !== id
                ),
            }));
        }
        catch (error) {
            set({
                err: error.response.data.message || "Failed To Delete Application",
            })
        }
        finally {
            set({ loading: false })
        }
    },

    clearError: () => set({ err: null })
}))