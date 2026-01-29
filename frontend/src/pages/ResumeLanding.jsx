import { useNavigate } from 'react-router-dom'

const ResumeLanding = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Resume Builder</h1>
                    <p className="text-lg text-gray-600">Create professional resumes or manage your existing ones</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div
                        onClick={() => navigate('/resume/create')}
                        className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Create New Resume</h2>
                            <p className="text-gray-600 mb-6">Start building a professional resume from scratch with our easy-to-use builder</p>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                                Get Started
                            </button>
                        </div>
                    </div>

                    <div
                        onClick={() => navigate('/resume/my-resumes')}
                        className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">My Resumes</h2>
                            <p className="text-gray-600 mb-6">View, edit, download, or delete your saved resumes</p>
                            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition">
                                View Resumes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResumeLanding
