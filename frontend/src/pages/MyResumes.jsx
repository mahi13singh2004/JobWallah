import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading resumes...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">My Resumes</h1>
                        <p className="text-gray-600 mt-2">Manage all your resumes in one place</p>
                    </div>
                    <button
                        onClick={() => navigate('/resume/create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        + Create New
                    </button>
                </div>

                {resumes.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No resumes yet</h3>
                        <p className="text-gray-500 mb-6">Create your first resume to get started</p>
                        <button
                            onClick={() => navigate('/resume/create')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Create Resume
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume) => (
                            <div key={resume._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">{resume.personalInfo?.name || 'Untitled Resume'}</h3>
                                            <p className="text-sm text-gray-500">{resume.personalInfo?.email}</p>
                                        </div>
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        {resume.experience?.length > 0 && resume.experience[0].role && (
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Experience:</span> {resume.experience.length} {resume.experience.length === 1 ? 'position' : 'positions'}
                                            </p>
                                        )}
                                        {resume.education?.length > 0 && resume.education[0].institution && (
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Education:</span> {resume.education[0].institution}
                                            </p>
                                        )}
                                        {resume.projects?.length > 0 && resume.projects[0].name && (
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Projects:</span> {resume.projects.length}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(resume)}
                                            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDownload(resume)}
                                            className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition"
                                        >
                                            Download
                                        </button>
                                        <button
                                            onClick={() => handleDelete(resume._id)}
                                            className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition"
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

export default MyResumes
