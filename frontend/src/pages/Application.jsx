import { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useApplicationStore } from '../store/application.store.js'
import { useAuthStore } from '../store/auth.store.js'

const Application = () => {
    const {
        applications, loading, err, getApplications, updateApplication, deleteApplication
    } = useApplicationStore()

    const { user, logout } = useAuthStore()

    useEffect(() => {
        getApplications()
    }, [getApplications])

    const handleStatusChange = async (appId, newStatus) => {
        await updateApplication(appId, { status: newStatus })
    }

    const handleDelete = async (appId) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            await deleteApplication(appId)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Applied': return 'bg-blue-500/20 text-blue-300 border-blue-500/50'
            case 'Interview': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
            case 'Offer': return 'bg-green-500/20 text-green-300 border-green-500/50'
            case 'Rejected': return 'bg-red-500/20 text-red-300 border-red-500/50'
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50'
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] pt-4 pb-8 px-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-linear-to-r from-green-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
                    <div className="relative bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-linear-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">My Applications</h1>
                                <p className="text-gray-400">Track your job applications and their progress</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-linear-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">{applications.filter(app => app.status === 'Applied').length}</span>
                                    </div>
                                    <div>
                                        <p className="text-blue-300 font-medium">Applied</p>
                                        <p className="text-blue-200 text-sm">Active applications</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-linear-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">{applications.filter(app => app.status === 'Interview').length}</span>
                                    </div>
                                    <div>
                                        <p className="text-yellow-300 font-medium">Interviews</p>
                                        <p className="text-yellow-200 text-sm">In progress</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-linear-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">{applications.filter(app => app.status === 'Offer').length}</span>
                                    </div>
                                    <div>
                                        <p className="text-green-300 font-medium">Offers</p>
                                        <p className="text-green-200 text-sm">Received</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8 flex justify-between items-center">
                    <Link
                        to="/applications/new"
                        className="group relative inline-flex items-center px-8 py-4 bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-green-400 to-blue-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <span className="relative flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add New Application
                        </span>
                    </Link>

                    <div className="text-right">
                        <p className="text-gray-400 text-sm">Total Applications</p>
                        <p className="text-3xl font-bold text-white">{applications.length}</p>
                    </div>
                </div>

                {err && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                        <p className="text-red-200">{err}</p>
                    </div>
                )}

                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        <p className="text-white text-lg">Loading applications...</p>
                    </div>
                )}

                {!loading && applications.length === 0 && (
                    <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
                        <div className="relative bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-12 text-center">
                            <div className="w-24 h-24 bg-linear-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">No Applications Yet</h3>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">Start tracking your job applications to stay organized and never miss a follow-up</p>
                            <Link
                                to="/applications/new"
                                className="group relative inline-flex items-center px-8 py-4 bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-green-400 to-blue-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <span className="relative flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Your First Application
                                </span>
                            </Link>
                        </div>
                    </div>
                )}

                {!loading && applications.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {applications.map((app, index) => (
                            <div
                                key={app._id}
                                className="group relative bg-linear-to-br from-[#1a1a1a] to-[#2a2a2a] border border-gray-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="relative">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1">{app.company}</h3>
                                            <p className="text-green-400 font-medium">{app.role}</p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                                            {app.status}
                                        </div>
                                    </div>

                                    {app.appliedDate && (
                                        <div className="flex items-center text-gray-400 text-sm mb-4">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Applied: {new Date(app.appliedDate).toLocaleDateString()}
                                        </div>
                                    )}

                                    {app.notes && (
                                        <div className="mb-4 p-3 bg-[#0a0a0a]/50 rounded-lg border border-gray-700/30">
                                            <p className="text-gray-300 text-sm line-clamp-2">{app.notes}</p>
                                        </div>
                                    )}

                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/applications/${app._id}`}
                                            className="flex-1 px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-xl transition-all duration-200 text-center transform hover:scale-105"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            to={`/ai-email/${app._id}`}
                                            className="flex-1 px-4 py-2 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-medium rounded-xl transition-all duration-200 text-center transform hover:scale-105"
                                        >
                                            AI Email
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(app._id)}
                                            className="px-4 py-2 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


            </div>
        </div>
    )
}

export default Application