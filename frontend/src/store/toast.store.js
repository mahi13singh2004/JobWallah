import { create } from "zustand"

export const useToastStore = create((set) => ({
    toasts: [],

    showToast: (message, type = 'success', duration = 3000) => {
        const id = Date.now()
        const newToast = { id, message, type, duration }

        set((state) => ({
            toasts: [...state.toasts, newToast]
        }))

        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter(toast => toast.id !== id)
            }))
        }, duration)
    },

    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter(toast => toast.id !== id)
        }))
    }
}))