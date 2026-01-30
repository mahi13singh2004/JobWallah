import { useState } from 'react'
import AIModal from '../AIModal'
import { useToastStore } from '../../../store/toast.store'

const ExperienceEditor = ({ data, onChange }) => {
    const { showToast } = useToastStore()
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
            showToast('Please add some content first', 'warning')
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
        <div className="h-full">
            <div className="flex justify-between items-center mb-6 pr-4">
                <h3 className="text-lg font-semibold text-white">Work Experience</h3>
                <button onClick={addExperience} className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">+ Add</button>
            </div>
            <div className="space-y-8 pb-8 pr-4">
                {data.map((exp, index) => (
                    <div key={index} className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-5">
                            <h4 className="font-medium text-white text-lg">Experience {index + 1}</h4>
                            <button onClick={() => removeExperience(index)} className="text-red-400 hover:text-red-300 text-sm transition-colors">Remove</button>
                        </div>
                        <div className="space-y-5">
                            <input type="text" placeholder="Job Title" value={exp.role} onChange={(e) => updateExperience(index, 'role', e.target.value)} className="w-full bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            <input type="text" placeholder="Company" value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} className="w-full bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            <input type="text" placeholder="Location" value={exp.location} onChange={(e) => updateExperience(index, 'location', e.target.value)} className="w-full bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Start Date" value={exp.startDate} onChange={(e) => updateExperience(index, 'startDate', e.target.value)} className="bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                                <input type="text" placeholder="End Date" value={exp.endDate} onChange={(e) => updateExperience(index, 'endDate', e.target.value)} className="bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-sm font-medium text-gray-300">Responsibilities</label>
                                    <button onClick={() => handleAIClick(index)} className="text-xs bg-linear-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded hover:from-purple-700 hover:to-blue-700 transition">
                                        ✨ Use AI
                                    </button>
                                </div>
                                {exp.bullets.map((bullet, bulletIndex) => (
                                    <div key={bulletIndex} className="flex mb-4">
                                        <textarea placeholder={`Responsibility ${bulletIndex + 1}`} value={bullet} onChange={(e) => updateBullet(index, bulletIndex, e.target.value)} className="flex-1 bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 mr-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none" rows="3" />
                                        <button onClick={() => removeBullet(index, bulletIndex)} className="text-red-400 hover:text-red-300 px-2 transition-colors text-lg">×</button>
                                    </div>
                                ))}
                                <button onClick={() => addBullet(index)} className="text-green-400 hover:text-green-300 text-sm transition-colors">+ Add Responsibility</button>
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
