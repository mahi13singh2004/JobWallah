import { useState } from 'react';
import { useJobSearchStore } from '../store/jobSearch.store';

const JobSearch = () => {
    const { jobs, isLoading, searchesRemaining, searchJobs } = useJobSearchStore();
    const [formData, setFormData] = useState({
        keyword: '',
        location: '',
        jobType: '',
        remoteFilter: '',
        experienceLevel: '',
        dateSincePosted: 'past Week'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await searchJobs(formData);
            if (result?.data?.searchesRemaining !== null) {
                console.log(`Searches remaining today: ${result.data.searchesRemaining}`);
            }
        } catch (error) {
            console.error('Search failed:', error);
            alert(error.response?.data?.message || 'Search failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Job Search</h1>

                {searchesRemaining !== null && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p className="text-blue-800">
                            Searches remaining today: <span className="font-bold">{searchesRemaining}/3</span>
                        </p>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Title / Keywords *
                                </label>
                                <input
                                    type="text"
                                    name="keyword"
                                    value={formData.keyword}
                                    onChange={handleChange}
                                    placeholder="e.g. Software Engineer"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. India, New York"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Type
                                </label>
                                <select
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Any</option>
                                    <option value="full time">Full Time</option>
                                    <option value="part time">Part Time</option>
                                    <option value="contract">Contract</option>
                                    <option value="internship">Internship</option>
                                    <option value="temporary">Temporary</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Work Mode
                                </label>
                                <select
                                    name="remoteFilter"
                                    value={formData.remoteFilter}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Any</option>
                                    <option value="remote">Remote</option>
                                    <option value="on site">On Site</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Experience Level
                                </label>
                                <select
                                    name="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Any</option>
                                    <option value="internship">Internship</option>
                                    <option value="entry level">Entry Level</option>
                                    <option value="associate">Associate</option>
                                    <option value="senior">Senior</option>
                                    <option value="director">Director</option>
                                    <option value="executive">Executive</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date Posted
                                </label>
                                <select
                                    name="dateSincePosted"
                                    value={formData.dateSincePosted}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="24hr">Past 24 Hours</option>
                                    <option value="past Week">Past Week</option>
                                    <option value="past month">Past Month</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {isLoading ? 'Searching...' : 'Search Jobs'}
                        </button>
                    </form>
                </div>

                {jobs.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Found {jobs.length} Jobs
                        </h2>
                        {jobs.map((job, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                            {job.title}
                                        </h3>
                                        <p className="text-lg text-gray-700 mb-2">{job.company}</p>
                                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                            {job.location && (
                                                <span className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {job.location}
                                                </span>
                                            )}
                                            {job.jobType && (
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                                    {job.jobType}
                                                </span>
                                            )}
                                            {job.salary && (
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                                                    {job.salary}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.source === 'linkedin'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {job.source === 'linkedin' ? 'LinkedIn' : 'Google'}
                                    </span>
                                </div>

                                {job.description && (
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {job.description}
                                    </p>
                                )}

                                <div className="flex justify-between items-center">
                                    {job.postedDate && (
                                        <span className="text-sm text-gray-500">
                                            Posted: {job.postedDate}
                                        </span>
                                    )}
                                    {job.applyLink && (
                                        <a
                                            href={job.applyLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Apply Now
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && jobs.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
                        <p className="mt-1 text-sm text-gray-500">Start searching for your dream job!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobSearch;
