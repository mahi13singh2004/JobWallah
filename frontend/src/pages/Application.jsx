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
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">My Applications</h1>
                        <p className="text-gray-300">Track your job applications and their progress</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/profile"
                            className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                        >
                            Profile
                        </Link>
                        <span className="text-gray-300">Welcome, {user?.name}</span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <Link
                        to="/applications/new"
                        className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                        <span className="text-xl mr-2">+</span>
                        Add New Application
                    </Link>
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
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-2xl font-semibold text-white mb-2">No Applications Yet</h3>
                        <p className="text-gray-300 mb-6">Start tracking your job applications to stay organized</p>
                        <Link
                            to="/applications/new"
                            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200"
                        >
                            Add Your First Application
                        </Link>
                    </div>
                )}

                {!loading && applications.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {applications.map(app => (
                            <div key={app._id} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-white mb-1">{app.company}</h3>
                                    <p className="text-purple-300 font-medium">{app.role}</p>
                                </div>

                                {app.appliedDate && (
                                    <p className="text-gray-300 text-sm mb-4">
                                        Applied: {new Date(app.appliedDate).toLocaleDateString()}
                                    </p>
                                )}

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Status</label>
                                    <select
                                        value={app.status}
                                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                        className={`w-full px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${getStatusColor(app.status)}`}
                                    >
                                        <option value="Applied">Applied</option>
                                        <option value="Interview">Interview</option>
                                        <option value="Offer">Offer</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                                {app.notes && (
                                    <div className="mb-4">
                                        <p className="text-gray-300 text-sm line-clamp-2">{app.notes}</p>
                                    </div>
                                )}

                                <div className="flex space-x-2 mb-4">
                                    <Link
                                        to={`/applications/${app._id}`}
                                        className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 text-center"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        to={`/ai-email/${app._id}`}
                                        className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 text-center"
                                    >
                                        AI Email
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(app._id)}
                                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                                    >
                                        Delete
                                    </button>
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