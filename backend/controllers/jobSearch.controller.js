import { fetchLinkedInJobs } from '../utils/linkedinJobs.js';
import { fetchSerpApiJobs } from '../utils/serpApiJobs.js';
import User from '../models/user.model.js';

export const searchJobs = async (req, res) => {
    try {
        const { keyword, location, jobType, remoteFilter, experienceLevel, dateSincePosted } = req.body;
        const userId = req.cookies.token ? req.user?._id : null;

        if (!keyword) {
            return res.status(400).json({ success: false, message: 'Keyword is required' });
        }

        if (userId) {
            const user = await User.findById(userId);

            if (!user.isPremium) {
                const now = new Date();
                const last24h = new Date(now - 24 * 60 * 60 * 1000);

                if (!user.lastJobSearch || user.lastJobSearch < last24h) {
                    user.jobSearchCount = 0;
                }
                if (user.jobSearchCount >= 3) {
                    return res.status(429).json({
                        success: false,
                        message: 'Daily search limit reached. Upgrade to premium for unlimited searches.'
                    });
                }

                user.jobSearchCount += 1;
                user.lastJobSearch = now;
                await user.save();
            }
        }

        const linkedInOptions = {
            keyword,
            location: location || '',
            dateSincePosted: dateSincePosted || 'past Week',
            jobType: jobType || '',
            remoteFilter: remoteFilter || '',
            experienceLevel: experienceLevel || '',
            limit: '10',
            page: '0'
        };

        const serpApiOptions = {
            keyword,
            location,
            jobType,
            remoteFilter
        };

        const [linkedInJobs, serpApiJobs] = await Promise.all([
            fetchLinkedInJobs(linkedInOptions),
            fetchSerpApiJobs(serpApiOptions)
        ]);

        const combinedJobs = [...linkedInJobs, ...serpApiJobs].slice(0, 10);

        let searchesRemaining = null;
        if (userId) {
            const currentUser = await User.findById(userId);
            searchesRemaining = currentUser.isPremium ? 'unlimited' : (3 - currentUser.jobSearchCount);
        }

        res.status(200).json({
            success: true,
            message: 'Jobs fetched successfully',
            data: {
                jobs: combinedJobs,
                total: combinedJobs.length,
                sources: {
                    linkedin: linkedInJobs.length,
                    google: serpApiJobs.length
                },
                searchesRemaining
            }
        });
    } catch (error) {
        console.error('Error in searchJobs:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch jobs' });
    }
};
