const BasicDetailsEditor = ({ data, onChange }) => {
    const handleChange = (field, value) => onChange({ ...data, [field]: value })
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Basic Details</h3>
            <div className="space-y-4 pr-4">
                <div><label className="block text-sm font-medium mb-1 text-gray-300">Full Name</label><input type="text" value={data.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" /></div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1 text-gray-300">Email</label><input type="email" value={data.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" /></div>
                    <div><label className="block text-sm font-medium mb-1 text-gray-300">Phone</label><input type="text" value={data.phone} onChange={(e) => handleChange('phone', e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1 text-gray-300">Location</label><input type="text" value={data.location} onChange={(e) => handleChange('location', e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" /></div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1 text-gray-300">LinkedIn</label><input type="text" value={data.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" /></div>
                    <div><label className="block text-sm font-medium mb-1 text-gray-300">GitHub</label><input type="text" value={data.github} onChange={(e) => handleChange('github', e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" /></div>
                </div>
            </div>
        </div>
    )
}

export default BasicDetailsEditor
