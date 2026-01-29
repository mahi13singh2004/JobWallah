import linkedIn from 'linkedin-jobs-api';

export const fetchLinkedInJobs = async (queryOptions) => {
    try {
        const jobs = await linkedIn.query(queryOptions);

        return jobs.map(job => ({
            title: job.position || '',
            company: job.company || '',
            location: job.location || '',
            description: job.description || '',
            salary: job.salary || '',
            jobType: job.jobType || '',
            postedDate: job.postDate || '',
            applyLink: job.jobUrl || '',
            source: 'linkedin'
        }));
    } catch (error) {
        console.error('LinkedIn API Error:', error);
        return [];
    }
};
