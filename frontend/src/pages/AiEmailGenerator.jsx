import { useState, useEffect } from 'react'
import { useAiEmailStore } from '../store/aiEmail.store.js'
import { useParams, Link } from 'react-router-dom'
import { useApplicationStore } from '../store/application.store.js'

const GeneratedEmailPreview = ({ emailBody }) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Generated Email</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Email Content</label>
                    <div className="space-y-2">
                        <textarea
                            value={emailBody}
                            readOnly
                            rows={12}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white resize-none"
                        />
                        <button
                            onClick={() => copyToClipboard(emailBody)}
                            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
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
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link
                        to="/applications"
                        className="text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm font-medium mb-4 inline-block"
                    >
                        ← Back to Applications
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">AI Email Generator</h1>
                    {application && (
                        <p className="text-gray-300">
                            Generating email for {application.company} - {application.role}
                        </p>
                    )}
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
                    <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Email Type</label>
                            <select
                                value={emailType}
                                onChange={(e) => setEmailType(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="cold_outreach">Cold Outreach</option>
                                <option value="follow_up">Follow-up</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>

                        {!applicationId && (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Company</label>
                                    <input
                                        placeholder='e.g. Google, Microsoft'
                                        value={manualCompany}
                                        onChange={(e) => setManualCompany(e.target.value)}
                                        type="text"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">Role</label>
                                    <input
                                        placeholder='e.g. Software Engineer'
                                        value={manualRole}
                                        onChange={(e) => setManualRole(e.target.value)}
                                        type="text"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Additional Context</label>
                            <textarea
                                placeholder='Add any specific context or requirements for the email...'
                                value={customContext}
                                onChange={(e) => setCustomContext(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
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
                            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
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