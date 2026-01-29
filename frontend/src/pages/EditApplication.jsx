import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useApplicationStore } from '../store/application.store.js'
import { useReminderStore } from '../store/reminder.store.js'
import ReminderForm from '../components/ReminderForm.jsx'
import ReminderList from '../components/ReminderList.jsx'

const EditApplication = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { getApplicationById, updateApplication, loading, err } = useApplicationStore()
    const { getReminderByApplication, reminders, clearReminders } = useReminderStore()
    const [form, setForm] = useState({
        company: "",
        role: "",
        status: "Applied",
        appliedDate: "",
        notes: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await updateApplication(id, form)
        if (res) navigate("/applications")
    }

    const fetchReminders = async () => {
        await getReminderByApplication(id)
    }

    useEffect(() => {
        const fetchApp = async () => {
            const app = await getApplicationById(id)
            if (app) {
                setForm({
                    company: app.company,
                    role: app.role,
                    status: app.status,
                    notes: app.notes || "",
                    appliedDate: app.appliedDate ? app.appliedDate.split('T')[0] : "",
                })
            }
        }
        fetchApp()
        fetchReminders()

        return () => clearReminders()
    }, [id, getApplicationById, getReminderByApplication, clearReminders])

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
                    <h1 className="text-3xl font-bold text-white">Edit Application</h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
                        <h2 className="text-xl font-semibold text-white mb-6">Application Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                        Company *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        placeholder="e.g. Google, Microsoft"
                                        value={form.company}
                                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                        Role *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        placeholder="e.g. Software Engineer"
                                        value={form.role}
                                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={form.status}
                                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="Applied">Applied</option>
                                        <option value="Interview">Interview</option>
                                        <option value="Offer">Offer</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                        Applied Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        value={form.appliedDate}
                                        onChange={(e) => setForm({ ...form, appliedDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Notes
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                                    placeholder="Add any notes about this application..."
                                    value={form.notes}
                                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                />
                            </div>

                            {err && (
                                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                                    <p className="text-red-200 text-sm text-center">{err}</p>
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
                                        Updating...
                                    </div>
                                ) : (
                                    "Update Application"
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="space-y-6">
                        <ReminderForm
                            applicationId={id}
                            onReminderAdded={fetchReminders}
                        />
                        <ReminderList
                            reminders={reminders}
                            onReminderUpdate={fetchReminders}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditApplication