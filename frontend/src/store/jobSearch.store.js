import { create } from 'zustand';
import axios from '../utils/axios';

export const useJobSearchStore = create((set) => ({
    jobs: [],
    isLoading: false,
    error: null,
    searchesRemaining: null,

    searchJobs: async (searchParams) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post('/api/jobs/search', searchParams);
            set({
                jobs: response.data.data.jobs,
                searchesRemaining: response.data.data.searchesRemaining,
                isLoading: false
            });
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to search jobs',
                isLoading: false
            });
            throw error;
        }
    },

    clearJobs: () => set({ jobs: [], error: null })
}));
