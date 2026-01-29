import { create } from "zustand"
import axiosInstance from "../utils/axios.js"

export const useReminderStore = create((set) => ({
    reminders: [],
    loading: false,
    err: null,

    createReminder: async (data) => {
        try {
            set({ loading: true, err: null })
            const res = await axiosInstance.post("/api/reminder", data);
            set((state) => ({
                reminders: [res.data, ...state.reminders],
                loading: false
            }))
            return true
        } catch (error) {
            set({
                err: error.response?.data?.message || "Failed to create reminder",
                loading: false
            })
            throw error
        }
    },

    getReminder: async () => {
        try {
            set({ loading: true, err: null })
            const res = await axiosInstance.get("/api/reminder")
            set({ reminders: res.data, loading: false })
        }
        catch (error) {
            set({
                err: error.response?.data?.message || "Failed to fetch reminders",
                loading: false
            })
        }
    },

    getReminderByApplication: async (id) => {
        try {
            set({ loading: true, err: null })
            const res = await axiosInstance.get(`/api/reminder/application/${id}`)
            set({ reminders: res.data || [], loading: false })
            return res.data
        }
        catch (error) {
            set({
                err: error.response?.data?.message || "Failed to fetch reminder",
                loading: false,
                reminders: [] 
            })
            return null
        }
    },

    updateReminder: async (id, data) => {
        try {
            set({ loading: true, err: null })
            const res = await axiosInstance.put(`/api/reminder/${id}`, data)
            set((state) => ({
                reminders: state.reminders.map(reminder =>
                    reminder._id === id ? res.data : reminder
                ),
                loading: false
            }))
            return true
        } catch (error) {
            set({
                err: error.response?.data?.message || "Failed to update reminder",
                loading: false
            })
            throw error
        }
    },

    deleteReminder: async (id) => {
        try {
            set({ loading: true, err: null })
            await axiosInstance.delete(`/api/reminder/${id}`)
            set((state) => ({
                reminders: state.reminders.filter(reminder => reminder._id !== id),
                loading: false
            }))
            return true
        } catch (error) {
            set({
                err: error.response?.data?.message || "Failed to delete reminder",
                loading: false
            })
            throw error
        }
    },

    clearReminders: () => {
        set({ reminders: [], err: null })
    },

    clearError: () => {
        set({ err: null })
    }
}))