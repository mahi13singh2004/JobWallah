import { useState } from 'react'

const SkillsEditor = ({ data, onChange }) => {
    const [showSection, setShowSection] = useState(data.languages.length > 0 || data.frameworks.length > 0 || data.aiTools.length > 0 || data.databases.length > 0 || data.coreCS.length > 0)

    const handleChange = (category, value) => onChange({ ...data, [category]: value.split(',').map(skill => skill.trim()).filter(skill => skill) })

    const handleDelete = () => {
        setShowSection(false)
        onChange({ languages: [], frameworks: [], aiTools: [], databases: [], coreCS: [] })
    }

    const handleAdd = () => {
        setShowSection(true)
        onChange({ languages: ['JavaScript'], frameworks: ['React'], aiTools: [], databases: ['MongoDB'], coreCS: ['Data Structures'] })
    }

    if (!showSection) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Technical Skills section is hidden</p>
                <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Technical Skills Section</button>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Technical Skills</h3>
                <button onClick={handleDelete} className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">Delete Section</button>
            </div>
            <div className="space-y-4">
                <div><label className="block text-sm font-medium mb-1">Languages</label><input type="text" value={data.languages.join(', ')} onChange={(e) => handleChange('languages', e.target.value)} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Java, Python, JavaScript..." /></div>
                <div><label className="block text-sm font-medium mb-1">Frameworks & Libraries</label><input type="text" value={data.frameworks.join(', ')} onChange={(e) => handleChange('frameworks', e.target.value)} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="React.js, Express.js..." /></div>
                <div><label className="block text-sm font-medium mb-1">AI & ML Tools</label><input type="text" value={data.aiTools.join(', ')} onChange={(e) => handleChange('aiTools', e.target.value)} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="OpenAI API, TensorFlow..." /></div>
                <div><label className="block text-sm font-medium mb-1">Databases & Cloud</label><input type="text" value={data.databases.join(', ')} onChange={(e) => handleChange('databases', e.target.value)} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="MongoDB, MySQL, AWS..." /></div>
                <div><label className="block text-sm font-medium mb-1">Core CS</label><input type="text" value={data.coreCS.join(', ')} onChange={(e) => handleChange('coreCS', e.target.value)} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Data Structures, Algorithms..." /></div>
            </div>
        </div>
    )
}

export default SkillsEditor
