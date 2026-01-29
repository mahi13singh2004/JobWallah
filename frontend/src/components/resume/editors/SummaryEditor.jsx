import { useState } from 'react'
import AIModal from '../AIModal'

const SummaryEditor = ({ data, onChange }) => {
    const [showSection, setShowSection] = useState(!!data)
    const [aiModalOpen, setAiModalOpen] = useState(false)

    const handleDelete = () => {
        setShowSection(false)
        onChange('')
    }

    const handleAdd = () => {
        setShowSection(true)
        onChange('I am a web developer having expertise in frontend development and experience in back-end development.')
    }

    const handleAIClick = () => {
        if (!data || !data.trim()) {
            alert('Please add some content first')
            return
        }
        setAiModalOpen(true)
    }

    const handleAIApply = (improvedSummary) => {
        onChange(improvedSummary)
        setAiModalOpen(false)
    }

    if (!showSection) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Summary section is hidden</p>
                <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Summary Section</button>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Professional Summary</h3>
                <div className="flex space-x-2">
                    <button onClick={handleAIClick} className="text-xs bg-linear-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded hover:from-purple-700 hover:to-blue-700 transition">
                        ✨ Use AI
                    </button>
                    <button onClick={handleDelete} className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">Delete Section</button>
                </div>
            </div>
            <textarea value={data} onChange={(e) => onChange(e.target.value)} rows="4" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Write a brief summary..." />

            <AIModal
                isOpen={aiModalOpen}
                onClose={() => setAiModalOpen(false)}
                content={data}
                onApply={handleAIApply}
                type="summary"
            />
        </div>
    )
}

export default SummaryEditor

