import { useState } from 'react'
import { useAIAnalysisStore } from '../store/aiAnalysis.store'

const Analysis = () => {
    const { analyzeResume, analysis, loading, clearAnalysis } = useAIAnalysisStore()
    const [resumeFile, setResumeFile] = useState(null)
    const [jobDescription, setJobDescription] = useState('')
    const [fileName, setFileName] = useState('')

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.type !== 'application/pdf') {
                alert('Please upload a PDF file')
                return
            }
            setResumeFile(file)
            setFileName(file.name)
        }
    }

    const handleAnalyze = async () => {
        if (!resumeFile) {
            alert('Please upload your resume PDF')
            return
        }

        if (!jobDescription.trim()) {
            alert('Please provide job description')
            return
        }

        try {
            await analyzeResume(resumeFile, jobDescription)
        } catch (error) {
            console.error('Analysis error:', error)
            alert('Failed to analyze. Please try again.')
        }
    }

    const handleReset = () => {
        setResumeFile(null)
        setFileName('')
        setJobDescription('')
        clearAnalysis()
    }

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600'
        if (score >= 60) return 'text-yellow-600'
        return 'text-red-600'
    }

    const getScoreBgColor = (score) => {
        if (score >= 80) return 'bg-green-100'
        if (score >= 60) return 'bg-yellow-100'
        return 'bg-red-100'
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-4 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 lg:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Resume vs Job Description Analysis</h1>
                    <p className="text-gray-300 text-sm sm:text-base">Get AI-powered insights on how well your resume matches the job requirements</p>
                </div>

                {!analysis ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Upload Your Resume</h2>

                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="hidden"
                                id="resume-upload"
                            />
                            <label htmlFor="resume-upload" className="cursor-pointer block">
                                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 sm:p-8 text-center hover:border-green-500 transition">
                                    <div className="flex flex-col items-center">
                                        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        {fileName ? (
                                            <div>
                                                <p className="text-green-400 font-medium mb-2 text-sm sm:text-base">✓ {fileName}</p>
                                                <p className="text-xs sm:text-sm text-gray-400">Click to change file</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-base sm:text-lg font-medium text-gray-300 mb-2">Click to upload resume</p>
                                                <p className="text-xs sm:text-sm text-gray-400">PDF format only (Max 5MB)</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </label>

                            {fileName && (
                                <div className="mt-4 p-3 bg-green-900/20 border border-green-600 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-green-300">{fileName}</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setResumeFile(null)
                                            setFileName('')
                                        }}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Job Description</h2>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the job description here..."
                                className="w-full h-64 sm:h-96 bg-[#0a0a0a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm sm:text-base"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
                                <button
                                    onClick={handleReset}
                                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                                >
                                    New Analysis
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                <div className={`${getScoreBgColor(analysis.overallScore)} rounded-lg p-4 text-center`}>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Overall Match</p>
                                    <p className={`text-2xl sm:text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>{analysis.overallScore}%</p>
                                </div>
                                <div className={`${getScoreBgColor(analysis.keywordMatch)} rounded-lg p-4 text-center`}>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Keyword Match</p>
                                    <p className={`text-2xl sm:text-4xl font-bold ${getScoreColor(analysis.keywordMatch)}`}>{analysis.keywordMatch}%</p>
                                </div>
                                <div className={`${getScoreBgColor(analysis.experienceMatch)} rounded-lg p-4 text-center sm:col-span-2 lg:col-span-1`}>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Experience Match</p>
                                    <p className={`text-2xl sm:text-4xl font-bold ${getScoreColor(analysis.experienceMatch)}`}>{analysis.experienceMatch}%</p>
                                </div>
                            </div>

                            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
                                <p className="text-gray-300">{analysis.summary}</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold mb-3 text-green-400">✓ Matched Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {analysis.matchedSkills.map((skill, index) => (
                                            <span key={index} className="bg-green-900/30 text-green-300 px-3 py-1 rounded-full text-xs sm:text-sm border border-green-600">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold mb-3 text-red-400">✗ Missing Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {analysis.missingSkills.map((skill, index) => (
                                            <span key={index} className="bg-red-900/30 text-red-300 px-3 py-1 rounded-full text-xs sm:text-sm border border-red-600">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-semibold mb-4 text-green-400">Strengths</h3>
                                <ul className="space-y-2">
                                    {analysis.strengths.map((strength, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-green-400 mr-2">✓</span>
                                            <span className="text-gray-300 text-sm sm:text-base">{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-semibold mb-4 text-orange-400">Areas to Improve</h3>
                                <ul className="space-y-2">
                                    {analysis.weaknesses.map((weakness, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-orange-400 mr-2">!</span>
                                            <span className="text-gray-300 text-sm sm:text-base">{weakness}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 sm:p-6">
                            <h3 className="text-base sm:text-lg font-semibold mb-4 text-blue-400">Recommendations</h3>
                            <ul className="space-y-3">
                                {analysis.recommendations.map((recommendation, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="bg-blue-900/30 text-blue-300 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-3 shrink-0 text-xs sm:text-sm font-semibold border border-blue-600">
                                            {index + 1}
                                        </span>
                                        <span className="text-gray-300 text-sm sm:text-base">{recommendation}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {!analysis && (
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="bg-green-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analyzing...
                                </span>
                            ) : (
                                '✨ Analyze Resume'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Analysis
