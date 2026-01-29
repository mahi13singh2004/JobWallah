import { useState } from 'react'
import AIModal from '../AIModal'

const ProjectsEditor = ({ data, onChange }) => {
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
            alert('Please add some content first')
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
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Projects</h3>
                <button onClick={addProject} className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">+ Add</button>
            </div>
            <div className="space-y-4">
                {data.map((project, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium">Project {index + 1}</h4>
                            <button onClick={() => removeProject(index)} className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                        </div>
                        <div className="space-y-3">
                            <input type="text" placeholder="Project Name" value={project.name} onChange={(e) => updateProject(index, 'name', e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="text" placeholder="Tech Stack (comma separated)" value={project.techStack.join(', ')} onChange={(e) => updateProject(index, 'techStack', e.target.value.split(',').map(s => s.trim()))} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" placeholder="Start Date" value={project.startDate} onChange={(e) => updateProject(index, 'startDate', e.target.value)} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <input type="text" placeholder="End Date" value={project.endDate} onChange={(e) => updateProject(index, 'endDate', e.target.value)} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium">Project Details</label>
                                    <button onClick={() => handleAIClick(index)} className="text-xs bg-linear-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded hover:from-purple-700 hover:to-blue-700 transition">
                                        ✨ Use AI
                                    </button>
                                </div>
                                {project.bullets.map((bullet, bulletIndex) => (
                                    <div key={bulletIndex} className="flex mb-2">
                                        <textarea placeholder={`Detail ${bulletIndex + 1}`} value={bullet} onChange={(e) => updateBullet(index, bulletIndex, e.target.value)} className="flex-1 border rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="2" />
                                        <button onClick={() => removeBullet(index, bulletIndex)} className="text-red-600 hover:text-red-800 px-2">×</button>
                                    </div>
                                ))}
                                <button onClick={() => addBullet(index)} className="text-blue-600 hover:text-blue-800 text-sm">+ Add Detail</button>
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
