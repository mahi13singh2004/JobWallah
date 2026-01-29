import axios from 'axios';

export const fetchSerpApiJobs = async (queryOptions) => {
    try {
        if (!process.env.SERPAPI_API_KEY || process.env.SERPAPI_API_KEY === 'your_serpapi_key_here') {
            return [];
        }

        const { keyword, location, jobType, remoteFilter } = queryOptions;

        let query = keyword;
        if (location) query += ` ${location}`;
        if (jobType) query += ` ${jobType}`;
        if (remoteFilter) query += ` ${remoteFilter}`;

        const response = await axios.get('https://serpapi.com/search', {
            params: {
                engine: 'google_jobs',
                q: query,
                api_key: process.env.SERPAPI_API_KEY,
                num: 10
            }
        });

        const jobs = response.data.jobs_results || [];

        return jobs.map(job => ({
            title: job.title || '',
            company: job.company_name || '',
            location: job.location || '',
            description: job.description || '',
            salary: job.detected_extensions?.salary || '',
            jobType: job.detected_extensions?.schedule_type || '',
            postedDate: job.detected_extensions?.posted_at || '',
            applyLink: job.apply_link || job.share_link || '',
            source: 'google'
        }));
    } catch (error) {
        return [];
    }
};
