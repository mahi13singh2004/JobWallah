import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJobSearchStore } from '../store/jobSearch.store';
import { useToastContext } from '../context/ToastContext';

const JobSearch = () => {
    const { jobs, isLoading, searchesRemaining, searchJobs } = useJobSearchStore();
    const { showToast } = useToastContext();
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
            showToast(error.response?.data?.message || 'Search failed', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-4 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 lg:mb-8">Job Search</h1>

                {searchesRemaining !== null && (
                    <div className={`border rounded-lg p-4 mb-6 ${searchesRemaining === 'unlimited'
                            ? 'bg-yellow-900/20 border-yellow-600'
                            : searchesRemaining === 0
                                ? 'bg-red-900/20 border-red-600'
                                : 'bg-blue-900/20 border-blue-600'
                        }`}>
                        {searchesRemaining === 'unlimited' ? (
                            <div className="flex items-center justify-between">
                                <p className="text-yellow-300 text-sm sm:text-base">
                                    <span className="font-bold">Premium Member:</span> Unlimited searches available!
                                </p>
                                <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                                    PREMIUM
                                </span>
                            </div>
                        ) : searchesRemaining === 0 ? (
                            <div className="text-center">
                                <p className="text-red-300 text-sm sm:text-base mb-3">
                                    Daily search limit reached. Upgrade to premium for unlimited searches!
                                </p>
                                <Link
                                    to="/premium"
                                    className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors text-sm"
                                >
                                    Upgrade to Premium
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <p className="text-blue-300 text-sm sm:text-base">
                                    Searches remaining today: <span className="font-bold">{searchesRemaining}/3</span>
                                </p>
                                <Link
                                    to="/premium"
                                    className="text-yellow-400 hover:text-yellow-300 text-xs font-medium transition-colors"
                                >
                                    Get Unlimited →
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 sm:p-6 mb-6 lg:mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Job Title / Keywords *
                                </label>
                                <input
                                    type="text"
                                    name="keyword"
                                    value={formData.keyword}
                                    onChange={handleChange}
                                    placeholder="e.g. Software Engineer"
                                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. India, New York"
                                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Job Type
                                </label>
                                <select
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
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
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Work Mode
                                </label>
                                <select
                                    name="remoteFilter"
                                    value={formData.remoteFilter}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                                >
                                    <option value="">Any</option>
                                    <option value="remote">Remote</option>
                                    <option value="on site">On Site</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Experience Level
                                </label>
                                <select
                                    name="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
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
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Date Posted
                                </label>
                                <select
                                    name="dateSincePosted"
                                    value={formData.dateSincePosted}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
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
                            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base"
                        >
                            {isLoading ? 'Searching...' : 'Search Jobs'}
                        </button>
                    </form>
                </div>

                {jobs.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-6">
                            Found {jobs.length} Jobs
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map((job, index) => (
                                <div
                                    key={index}
                                    className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-all duration-200 cursor-pointer transform hover:scale-[1.02] h-fit"
                                    onClick={() => job.applyLink && window.open(job.applyLink, '_blank')}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white mb-1 hover:text-green-400 transition-colors line-clamp-2">
                                                {job.title}
                                            </h3>
                                            <p className="text-base text-gray-300 mb-2">{job.company}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ml-2 ${job.source === 'linkedin'
                                            ? 'bg-blue-900/30 text-blue-300 border border-blue-600'
                                            : 'bg-red-900/30 text-red-300 border border-red-600'
                                            }`}>
                                            {job.source === 'linkedin' ? 'LinkedIn' : 'Google'}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 text-sm text-gray-400 mb-3">
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
                                            <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded border border-blue-600">
                                                {job.jobType}
                                            </span>
                                        )}
                                        {job.salary && (
                                            <span className="px-2 py-1 bg-green-900/30 text-green-300 rounded border border-green-600">
                                                {job.salary}
                                            </span>
                                        )}
                                    </div>

                                    {job.description && (
                                        <p className="text-gray-400 mb-4 line-clamp-3 text-sm">
                                            {job.description}
                                        </p>
                                    )}

                                    {job.postedDate && (
                                        <div className="mt-auto">
                                            <span className="text-xs text-gray-500">
                                                Posted: {job.postedDate}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!isLoading && jobs.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-white">No jobs found</h3>
                        <p className="mt-1 text-sm text-gray-400">Start searching for your dream job!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobSearch;
