const EducationEditor = ({ data, onChange }) => {
    const addEducation = () => onChange([...data, { institution: '', degree: '', location: '', startDate: '', endDate: '' }])
    const updateEducation = (index, field, value) => onChange(data.map((item, i) => i === index ? { ...item, [field]: value } : item))
    const removeEducation = (index) => onChange(data.filter((_, i) => i !== index))

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Education</h3>
                <button onClick={addEducation} className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">+ Add</button>
            </div>
            <div className="space-y-4">
                {data.map((edu, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium">Education {index + 1}</h4>
                            <button onClick={() => removeEducation(index)} className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                        </div>
                        <div className="space-y-3">
                            <input type="text" placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="text" placeholder="Location" value={edu.location} onChange={(e) => updateEducation(index, 'location', e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" placeholder="Start Date" value={edu.startDate} onChange={(e) => updateEducation(index, 'startDate', e.target.value)} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <input type="text" placeholder="End Date" value={edu.endDate} onChange={(e) => updateEducation(index, 'endDate', e.target.value)} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EducationEditor
