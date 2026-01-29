import { useState } from 'react'
import AIModal from '../AIModal'

const ExperienceEditor = ({ data, onChange }) => {
    const [aiModalOpen, setAiModalOpen] = useState(false)
    const [currentExpIndex, setCurrentExpIndex] = useState(null)
    const [currentContent, setCurrentContent] = useState('')

    const addExperience = () => onChange([...data, { role: '', company: '', location: '', startDate: '', endDate: '', bullets: [''] }])
    const updateExperience = (index, field, value) => onChange(data.map((item, i) => i === index ? { ...item, [field]: value } : item))
    const updateBullet = (expIndex, bulletIndex, value) => onChange(data.map((item, i) => i === expIndex ? { ...item, bullets: item.bullets.map((b, bi) => bi === bulletIndex ? value : b) } : item))
    const addBullet = (expIndex) => onChange(data.map((item, i) => i === expIndex ? { ...item, bullets: [...item.bullets, ''] } : item))
    const removeBullet = (expIndex, bulletIndex) => onChange(data.map((item, i) => i === expIndex ? { ...item, bullets: item.bullets.filter((_, bi) => bi !== bulletIndex) } : item))
    const removeExperience = (index) => onChange(data.filter((_, i) => i !== index))

    const handleAIClick = (expIndex) => {
        const allBullets = data[expIndex].bullets.filter(b => b.trim()).join('. ')
        if (!allBullets) {
            alert('Please add some content first')
            return
        }
        setCurrentExpIndex(expIndex)
        setCurrentContent(allBullets)
        setAiModalOpen(true)
    }

    const handleAIApply = (improvedPoints) => {
        if (currentExpIndex !== null) {
            onChange(data.map((item, i) => i === currentExpIndex ? { ...item, bullets: improvedPoints } : item))
        }
        setAiModalOpen(false)
        setCurrentExpIndex(null)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Work Experience</h3>
                <button onClick={addExperience} className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">+ Add</button>
            </div>
            <div className="space-y-4">
                {data.map((exp, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium">Experience {index + 1}</h4>
                            <button onClick={() => removeExperience(index)} className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                        </div>
                        <div className="space-y-3">
                            <input type="text" placeholder="Job Title" value={exp.role} onChange={(e) => updateExperience(index, 'role', e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="text" placeholder="Company" value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="text" placeholder="Location" value={exp.location} onChange={(e) => updateExperience(index, 'location', e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" placeholder="Start Date" value={exp.startDate} onChange={(e) => updateExperience(index, 'startDate', e.target.value)} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <input type="text" placeholder="End Date" value={exp.endDate} onChange={(e) => updateExperience(index, 'endDate', e.target.value)} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium">Responsibilities</label>
                                    <button onClick={() => handleAIClick(index)} className="text-xs bg-linear-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded hover:from-purple-700 hover:to-blue-700 transition">
                                        ✨ Use AI
                                    </button>
                                </div>
                                {exp.bullets.map((bullet, bulletIndex) => (
                                    <div key={bulletIndex} className="flex mb-2">
                                        <textarea placeholder={`Responsibility ${bulletIndex + 1}`} value={bullet} onChange={(e) => updateBullet(index, bulletIndex, e.target.value)} className="flex-1 border rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="2" />
                                        <button onClick={() => removeBullet(index, bulletIndex)} className="text-red-600 hover:text-red-800 px-2">×</button>
                                    </div>
                                ))}
                                <button onClick={() => addBullet(index)} className="text-blue-600 hover:text-blue-800 text-sm">+ Add Responsibility</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AIModal
                isOpen={aiModalOpen}
                onClose={() => setAiModalOpen(false)}
                content={currentContent}
                onApply={handleAIApply}
                type="bullets"
            />
        </div>
    )
}

export default ExperienceEditor
