import { create } from 'zustand'
import axios from '../utils/axios'

const usePaymentStore = create((set, get) => ({
    isLoading: false,
    error: null,
    paymentStatus: null,

    createOrder: async (amount) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post('/payment/create-order', { amount })
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
            const response = await axios.post('/payment/verify', paymentData)
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
            const response = await axios.get('/payment/status')
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

export default usePaymentStore