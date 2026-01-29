import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFileAlt, FaEdit, FaDownload, FaTrash, FaPlus } from 'react-icons/fa'
import { useResumeStore } from '../store/resume.store'

const MyResumes = () => {
    const navigate = useNavigate()
    const { getResumes, deleteResume, downloadResume } = useResumeStore()
    const [resumes, setResumes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadResumes()
    }, [])

    const loadResumes = async () => {
        try {
            setLoading(true)
            const data = await getResumes()
            setResumes(data)
        } catch (error) {
            console.error('Load error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (resume) => {
        navigate('/resume/create', { state: { resume } })
    }

    const handleDownload = async (resume) => {
        try {
            const blob = await downloadResume(resume)
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${resume.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (error) {
            console.error('Download error:', error)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this resume?')) {
            try {
                await deleteResume(id)
                loadResumes()
            } catch (error) {
                console.error('Delete error:', error)
            }
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Loading your resumes...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">📝 My Resumes</h1>
                            <p className="text-gray-300 text-lg">Manage all your professional resumes in one place</p>
                        </div>
                        <button
                            onClick={() => navigate('/resume/create')}
                            className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-colors"
                        >
                            <FaPlus className="w-4 h-4" />
                            <span>Create New</span>
                        </button>
                    </div>

                    {resumes.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaFileAlt className="w-12 h-12 text-gray-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">No resumes yet</h3>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                Create your first professional resume to get started on your job search journey
                            </p>
                            <button
                                onClick={() => navigate('/resume/create')}
                                className="inline-flex items-center space-x-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-colors"
                            >
                                <FaPlus className="w-4 h-4" />
                                <span>Create Your First Resume</span>
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {resumes.map((resume) => (
                                <div key={resume._id} className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                                                {resume.personalInfo?.name || 'Untitled Resume'}
                                            </h3>
                                            <p className="text-gray-400 text-sm">{resume.personalInfo?.email}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                                            <FaFileAlt className="w-6 h-6 text-green-400" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        {resume.experience?.length > 0 && resume.experience[0].role && (
                                            <div className="flex items-center text-sm text-gray-300">
                                                <span className="font-medium text-gray-400">Experience:</span>
                                                <span className="ml-2">{resume.experience.length} {resume.experience.length === 1 ? 'position' : 'positions'}</span>
                                            </div>
                                        )}
                                        {resume.education?.length > 0 && resume.education[0].institution && (
                                            <div className="flex items-center text-sm text-gray-300">
                                                <span className="font-medium text-gray-400">Education:</span>
                                                <span className="ml-2">{resume.education[0].institution}</span>
                                            </div>
                                        )}
                                        {resume.projects?.length > 0 && resume.projects[0].name && (
                                            <div className="flex items-center text-sm text-gray-300">
                                                <span className="font-medium text-gray-400">Projects:</span>
                                                <span className="ml-2">{resume.projects.length}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(resume)}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                                        >
                                            <FaEdit className="w-4 h-4" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDownload(resume)}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                                        >
                                            <FaDownload className="w-4 h-4" />
                                            <span>Download</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(resume._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                                        >
                                            <FaTrash className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyResumes
