const EducationEditor = ({ data, onChange }) => {
    const addEducation = () => onChange([...data, { institution: '', degree: '', location: '', startDate: '', endDate: '' }])
    const updateEducation = (index, field, value) => onChange(data.map((item, i) => i === index ? { ...item, [field]: value } : item))
    const removeEducation = (index) => onChange(data.filter((_, i) => i !== index))

    return (
        <div className="h-full">
            <div className="flex justify-between items-center mb-6 pr-4">
                <h3 className="text-lg font-semibold text-white">Education</h3>
                <button onClick={addEducation} className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">+ Add</button>
            </div>
            <div className="space-y-8 pb-8 pr-4">
                {data.map((edu, index) => (
                    <div key={index} className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-5">
                            <h4 className="font-medium text-white text-lg">Education {index + 1}</h4>
                            <button onClick={() => removeEducation(index)} className="text-red-400 hover:text-red-300 text-sm transition-colors">Remove</button>
                        </div>
                        <div className="space-y-5">
                            <input type="text" placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} className="w-full bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} className="w-full bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            <input type="text" placeholder="Location" value={edu.location} onChange={(e) => updateEducation(index, 'location', e.target.value)} className="w-full bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Start Date" value={edu.startDate} onChange={(e) => updateEducation(index, 'startDate', e.target.value)} className="bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                                <input type="text" placeholder="End Date" value={edu.endDate} onChange={(e) => updateEducation(index, 'endDate', e.target.value)} className="bg-[#0a0a0a] border border-gray-500 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EducationEditor
