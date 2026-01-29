import { useNavigate } from 'react-router-dom'
import { FaPlus, FaFileAlt } from 'react-icons/fa'

const ResumeLanding = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="pt-4 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8 lg:mb-12">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">📝 Resume Builder</h1>
                        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
                            Create professional resumes with AI-powered suggestions or manage your existing ones
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                        <div
                            onClick={() => navigate('/resume/create')}
                            className="bg-linear-to-br from-green-500/10 to-[#1a1a1a] border border-green-500/20 rounded-2xl lg:rounded-3xl p-6 lg:p-8 cursor-pointer hover:border-green-500/60 transition-all duration-500 transform hover:scale-105 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-all duration-500"></div>
                            <div className="relative z-10 text-center">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-500/20 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <FaPlus className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-400" />
                                </div>
                                <h2 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                                    Create New Resume
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-300 mb-4 leading-relaxed">
                                    Start building a professional resume from scratch with our AI-powered builder and customizable templates
                                </p>
                                <div className="inline-flex items-center text-green-400 font-medium text-xs sm:text-sm group-hover:translate-x-2 transition-transform duration-300">
                                    <span>Get Started</span>
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/resume/my-resumes')}
                            className="bg-linear-to-br from-blue-500/10 to-[#1a1a1a] border border-blue-500/20 rounded-2xl lg:rounded-3xl p-6 lg:p-8 cursor-pointer hover:border-blue-500/60 transition-all duration-500 transform hover:scale-105 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all duration-500"></div>
                            <div className="relative z-10 text-center">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-500/20 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <FaFileAlt className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400" />
                                </div>
                                <h2 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    My Resumes
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-300 mb-4 leading-relaxed">
                                    View, edit, download, or delete your saved resumes. Manage all your professional documents in one place
                                </p>
                                <div className="inline-flex items-center text-blue-400 font-medium text-xs sm:text-sm group-hover:translate-x-2 transition-transform duration-300">
                                    <span>View Resumes</span>
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 lg:mt-16">
                        <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-6">Why Choose Our Resume Builder?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
                            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 lg:mb-4">
                                    <span className="text-lg lg:text-xl">🤖</span>
                                </div>
                                <h4 className="text-sm lg:text-base font-semibold text-white mb-2">AI-Powered</h4>
                                <p className="text-gray-400 text-xs">Get intelligent suggestions for content and formatting</p>
                            </div>
                            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 lg:mb-4">
                                    <span className="text-lg lg:text-xl">⚡</span>
                                </div>
                                <h4 className="text-sm lg:text-base font-semibold text-white mb-2">ATS-Friendly</h4>
                                <p className="text-gray-400 text-xs">Optimized to pass through applicant tracking systems</p>
                            </div>
                            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center sm:col-span-2 lg:col-span-1">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 lg:mb-4">
                                    <span className="text-lg lg:text-xl">📱</span>
                                </div>
                                <h4 className="text-sm lg:text-base font-semibold text-white mb-2">Professional</h4>
                                <p className="text-gray-400 text-xs">Clean, modern templates that impress employers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResumeLanding