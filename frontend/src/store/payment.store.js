import { create } from 'zustand'
import axiosInstance from '../utils/axios.js'

export const usePaymentStore = create((set) => ({
    isLoading: false,
    error: null,
    paymentStatus: null,

    createOrder: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.post('/api/payment/create-order')
            return response.data.order
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to create order' })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },

    verifyPayment: async (paymentData) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.post('/api/payment/verify', paymentData)
            set({ paymentStatus: 'success' })
            return response.data
        } catch (error) {
            set({ error: error.response?.data?.message || 'Payment verification failed' })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },

    getPaymentStatus: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.get('/api/payment/status')
            return response.data
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to get payment status' })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },

    clearError: () => set({ error: null }),
    clearPaymentStatus: () => set({ paymentStatus: null })
}))