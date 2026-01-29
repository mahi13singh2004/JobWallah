import { useState } from 'react'

const AchievementsEditor = ({ data, onChange }) => {
    const [showSection, setShowSection] = useState(data.length > 0 && data[0] !== '')

    const addAchievement = () => onChange([...data, ''])
    const updateAchievement = (index, value) => onChange(data.map((item, i) => i === index ? value : item))
    const removeAchievement = (index) => onChange(data.filter((_, i) => i !== index))

    const handleDelete = () => {
        setShowSection(false)
        onChange([])
    }

    const handleAdd = () => {
        setShowSection(true)
        onChange([''])
    }

    if (!showSection) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-400 mb-4">Achievements section is hidden</p>
                <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Add Achievements Section</button>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4 pr-4">
                <h3 className="text-lg font-semibold text-white">Achievements</h3>
                <div className="flex space-x-2">
                    <button onClick={addAchievement} className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">+ Add</button>
                    <button onClick={handleDelete} className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">Delete Section</button>
                </div>
            </div>
            <div className="space-y-3 pr-4">
                {data.map((achievement, index) => (
                    <div key={index} className="flex">
                        <textarea placeholder={`Achievement ${index + 1}`} value={achievement} onChange={(e) => updateAchievement(index, e.target.value)} className="flex-1 bg-[#1a1a1a] border border-gray-600 rounded px-3 py-2 mr-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none" rows="2" />
                        <button onClick={() => removeAchievement(index)} className="text-red-400 hover:text-red-300 px-2 transition-colors">×</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AchievementsEditor
