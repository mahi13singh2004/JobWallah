import { useState } from 'react'
import AIModal from '../AIModal'
import { useToastContext } from '../../../context/ToastContext'

const ProjectsEditor = ({ data, onChange }) => {
    const { showToast } = useToastContext()
    const [aiModalOpen, setAiModalOpen] = useState(false)
    const [currentProjIndex, setCurrentProjIndex] = useState(null)
    const [currentContent, setCurrentContent] = useState('')

    const addProject = () => onChange([...data, { name: '', techStack: [], startDate: '', endDate: '', bullets: [''] }])
    const updateProject = (index, field, value) => onChange(data.map((item, i) => i === index ? { ...item, [field]: value } : item))
    const updateBullet = (projIndex, bulletIndex, value) => onChange(data.map((item, i) => i === projIndex ? { ...item, bullets: item.bullets.map((b, bi) => bi === bulletIndex ? value : b) } : item))
    const addBullet = (projIndex) => onChange(data.map((item, i) => i === projIndex ? { ...item, bullets: [...item.bullets, ''] } : item))
    const removeBullet = (projIndex, bulletIndex) => onChange(data.map((item, i) => i === projIndex ? { ...item, bullets: item.bullets.filter((_, bi) => bi !== bulletIndex) } : item))
    const removeProject = (index) => onChange(data.filter((_, i) => i !== index))

    const handleAIClick = (projIndex) => {
        const allBullets = data[projIndex].bullets.filter(b => b.trim()).join('. ')
        if (!allBullets) {
            showToast('Please add some content first', 'warning')
            return
        }
        setCurrentProjIndex(projIndex)
        setCurrentContent(allBullets)
        setAiModalOpen(true)
    }

    const handleAIApply = (improvedPoints) => {
        if (currentProjIndex !== null) {
            onChange(data.map((item, i) => i === currentProjIndex ? { ...item, bullets: improvedPoints } : item))
        }
        setAiModalOpen(false)
        setCurrentProjIndex(null)
    }

    return (
        <div className="h-full">
            <div className="flex justify-between items-center mb-6 pr-4">
                <h3 className="text-lg font-semibold text-white">Projects</h3>
                <button onClick={addProject} className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">+ Add</button>
            </div>
            <div className="space-y-8 pb-8 pr-4">
                {data.map((project, index) => (
                    <div key={index} className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-5">
                            <h4 className="font-medium text-white text-lg">Project {index + 1}</h4>
                            <button onClick={() => removeProject(index)} className="text-red-400 hover:text-red-300 text-sm transition-colors">Remove</button>
                        </div>
                        <div className="space-y-5">
                            <input type="text" placeholder="Project Name" value={project.name} onChange={(e) => updateProject(index, 'name', e.target.value)} className="w-full bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            <input type="text" placeholder="Tech Stack (comma separated)" value={project.techStack.join(', ')} onChange={(e) => updateProject(index, 'techStack', e.target.value.split(',').map(s => s.trim()))} className="w-full bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Start Date" value={project.startDate} onChange={(e) => updateProject(index, 'startDate', e.target.value)} className="bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                                <input type="text" placeholder="End Date" value={project.endDate} onChange={(e) => updateProject(index, 'endDate', e.target.value)} className="bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-sm font-medium text-gray-300">Project Details</label>
                                    <button onClick={() => handleAIClick(index)} className="text-xs bg-linear-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded hover:from-purple-700 hover:to-blue-700 transition">
                                        ✨ Use AI
                                    </button>
                                </div>
                                {project.bullets.map((bullet, bulletIndex) => (
                                    <div key={bulletIndex} className="flex mb-4">
                                        <textarea placeholder={`Detail ${bulletIndex + 1}`} value={bullet} onChange={(e) => updateBullet(index, bulletIndex, e.target.value)} className="flex-1 bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 mr-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none" rows="3" />
                                        <button onClick={() => removeBullet(index, bulletIndex)} className="text-red-400 hover:text-red-300 px-2 transition-colors text-lg">×</button>
                                    </div>
                                ))}
                                <button onClick={() => addBullet(index)} className="text-green-400 hover:text-green-300 text-sm transition-colors">+ Add Detail</button>
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

export default ProjectsEditor
