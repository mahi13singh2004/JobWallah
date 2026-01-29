import { useState } from 'react'
import { useAISuggestionsStore } from '../../store/aiSuggestions.store'

const AIModal = ({ isOpen, onClose, content, onApply, type = 'bullets' }) => {
    const { improveContent, improveSummary, loading } = useAISuggestionsStore()
    const [numberOfPoints, setNumberOfPoints] = useState(3)
    const [improvedContent, setImprovedContent] = useState(null)

    if (!isOpen) return null

    const handleImprove = async () => {
        try {
            setImprovedContent(null)

            if (type === 'summary') {
                const summary = await improveSummary(content)
                setImprovedContent([summary])
            } else {
                const points = await improveContent(content, numberOfPoints)
                setImprovedContent(points)
            }
        } catch (error) {
            console.error('AI error:', error)
            alert('Failed to improve content. Please try again.')
        }
    }

    const handleApply = () => {
        if (improvedContent) {
            if (type === 'summary') {
                onApply(improvedContent[0])
            } else {
                onApply(improvedContent)
            }
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">✨ AI Content Improver</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Content:</label>
                        <div className="bg-gray-50 border rounded-lg p-3 text-sm text-gray-700 max-h-32 overflow-y-auto">
                            {content}
                        </div>
                    </div>

                    {type === 'bullets' && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Points:</label>
                            <select
                                value={numberOfPoints}
                                onChange={(e) => setNumberOfPoints(Number(e.target.value))}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                    <option key={num} value={num}>{num} {num === 1 ? 'point' : 'points'}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {!improvedContent && (
                        <button
                            onClick={handleImprove}
                            disabled={loading}
                            className="w-full bg-linear-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Improving with AI...
                                </span>
                            ) : (
                                '✨ Improve with AI'
                            )}
                        </button>
                    )}

                    {improvedContent && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Improved Content:</label>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                {type === 'summary' ? (
                                    <p className="text-sm text-gray-800">{improvedContent[0]}</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {improvedContent.map((point, index) => (
                                            <li key={index} className="flex text-sm text-gray-800">
                                                <span className="mr-2">•</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={handleApply}
                                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
                                >
                                    Apply Changes
                                </button>
                                <button
                                    onClick={handleImprove}
                                    disabled={loading}
                                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    Regenerate
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AIModal
