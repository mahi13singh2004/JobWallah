import { useState, useEffect } from 'react'
import { useAiEmailStore } from '../store/aiEmail.store.js'
import { useParams, Link } from 'react-router-dom'
import { useApplicationStore } from '../store/application.store.js'

const GeneratedEmailPreview = ({ emailBody }) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 sm:p-6 mt-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Generated Email</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Content</label>
                    <div className="space-y-2">
                        <textarea
                            value={emailBody}
                            readOnly
                            rows={12}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white resize-none text-sm sm:text-base"
                        />
                        <button
                            onClick={() => copyToClipboard(emailBody)}
                            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 text-sm sm:text-base"
                        >
                            Copy Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AiEmailGenerator = () => {
    const { applicationId } = useParams()
    const { generateEmail, emailResult, loading, err, clearEmailResult } = useAiEmailStore()
    const { getApplicationById } = useApplicationStore()

    const [emailType, setEmailType] = useState("follow_up")
    const [customContext, setCustomContext] = useState("")
    const [manualCompany, setManualCompany] = useState("")
    const [manualRole, setManualRole] = useState("")
    const [application, setApplication] = useState(null)

    useEffect(() => {
        if (applicationId) {
            const fetchApplication = async () => {
                const app = await getApplicationById(applicationId)
                setApplication(app)
            }
            fetchApplication()
        }
    }, [applicationId])

    const handleGenerate = async () => {
        clearEmailResult()

        const data = {
            emailType,
            customContext,
            ...(applicationId ? { applicationId } : { manualCompany, manualRole })
        }

        await generateEmail(data)
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-4 pb-8 px-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6 lg:mb-8">
                    <Link
                        to="/applications"
                        className="text-green-400 hover:text-green-300 transition-colors duration-200 text-sm font-medium mb-4 inline-block"
                    >
                        ← Back to Applications
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">AI Email Generator</h1>
                    {application && (
                        <p className="text-gray-300 text-sm sm:text-base">
                            Generating email for {application.company} - {application.role}
                        </p>
                    )}
                </div>

                <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 sm:p-6 lg:p-8">
                    <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="space-y-4 lg:space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Type</label>
                            <select
                                value={emailType}
                                onChange={(e) => setEmailType(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                            >
                                <option value="cold_outreach">Cold Outreach</option>
                                <option value="follow_up">Follow-up</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>

                        {!applicationId && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                                    <input
                                        placeholder='e.g. Google, Microsoft'
                                        value={manualCompany}
                                        onChange={(e) => setManualCompany(e.target.value)}
                                        type="text"
                                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                                    <input
                                        placeholder='e.g. Software Engineer'
                                        value={manualRole}
                                        onChange={(e) => setManualRole(e.target.value)}
                                        type="text"
                                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Additional Context</label>
                            <textarea
                                placeholder='Add any specific context or requirements for the email...'
                                value={customContext}
                                onChange={(e) => setCustomContext(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                            />
                        </div>

                        {err && (
                            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                                <p className="text-red-200 text-sm">{err}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent text-sm sm:text-base"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    Generating Email...
                                </div>
                            ) : (
                                "Generate Email"
                            )}
                        </button>
                    </form>

                    {emailResult && (
                        <GeneratedEmailPreview
                            emailBody={emailResult.emailBody}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AiEmailGenerator