import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import { useApplicationStore } from "../store/application.store.js"

const CreateApplication = () => {
    const [form, setForm] = useState({
        company: "",
        role: "",
        status: "Applied",
        appliedDate: "",
        notes: "",
    })

    const navigate = useNavigate();
    const { createApplication, loading, err } = useApplicationStore();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await createApplication(form)
        if (res) navigate("/applications")
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-4 pb-8 px-4 sm:p-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6 lg:mb-8">
                    <Link
                        to="/applications"
                        className="text-green-400 hover:text-green-300 transition-colors duration-200 text-sm font-medium mb-4 inline-block"
                    >
                        ← Back to Applications
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Add New Application</h1>
                </div>

                <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 sm:p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Company *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                    placeholder="e.g. Google, Microsoft"
                                    value={form.company}
                                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Role *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                    placeholder="e.g. Software Engineer"
                                    value={form.role}
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Status
                                </label>
                                <select
                                    value={form.status}
                                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                >
                                    <option value="Applied">Applied</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Applied Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                    value={form.appliedDate}
                                    onChange={(e) => setForm({ ...form, appliedDate: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Notes
                            </label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
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
                            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent text-sm sm:text-base"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    Creating...
                                </div>
                            ) : (
                                "Create Application"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateApplication