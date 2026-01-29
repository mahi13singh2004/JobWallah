const ResumePreview = ({ resumeData }) => {
    return (
        <div className="w-1/2 bg-gray-200 overflow-y-auto">
            <div className="p-8">
                <div className="max-w-4xl mx-auto bg-white shadow-2xl p-12">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold mb-2">{resumeData.personalInfo.name}</h1>
                        <div className="text-sm text-gray-600">{[resumeData.personalInfo.phone, resumeData.personalInfo.email, resumeData.personalInfo.linkedin, resumeData.personalInfo.github].filter(Boolean).join(' | ')}</div>
                    </div>

                    {resumeData.summary && (
                        <div className="mb-5">
                            <h2 className="text-sm font-bold uppercase mb-2 border-b border-black pb-1">Summary</h2>
                            <p className="text-sm leading-relaxed">{resumeData.summary}</p>
                        </div>
                    )}

                    {resumeData.education.length > 0 && resumeData.education[0].institution && (
                        <div className="mb-5">
                            <h2 className="text-sm font-bold uppercase mb-2 border-b border-black pb-1">Education</h2>
                            {resumeData.education.map((edu, index) => (
                                <div key={index} className="mb-3">
                                    <div className="flex justify-between items-start">
                                        <div><h3 className="font-bold text-sm">{edu.institution}</h3><p className="text-sm italic">{edu.degree}</p></div>
                                        <div className="text-right text-sm"><p>{edu.location}</p><p>{edu.startDate} - {edu.endDate}</p></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {resumeData.experience.length > 0 && resumeData.experience[0].role && (
                        <div className="mb-5">
                            <h2 className="text-sm font-bold uppercase mb-2 border-b border-black pb-1">Experience</h2>
                            {resumeData.experience.map((exp, index) => (
                                <div key={index} className="mb-3">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-sm">{exp.role}</h3>
                                        <p className="text-sm">{exp.startDate} - {exp.endDate}</p>
                                    </div>
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-sm italic">{exp.company}</p>
                                        <p className="text-sm">{exp.location}</p>
                                    </div>
                                    <ul className="text-sm space-y-1">
                                        {exp.bullets.map((bullet, bulletIndex) => bullet && (
                                            <li key={bulletIndex} className="flex"><span className="mr-2">•</span><span className="leading-relaxed">{bullet}</span></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}

                    {resumeData.projects.length > 0 && resumeData.projects[0].name && (
                        <div className="mb-5">
                            <h2 className="text-sm font-bold uppercase mb-2 border-b border-black pb-1">Projects</h2>
                            {resumeData.projects.map((project, index) => (
                                <div key={index} className="mb-3">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-sm">{project.name}</h3>
                                        <p className="text-sm">{project.startDate} - {project.endDate}</p>
                                    </div>
                                    <p className="text-sm italic mb-2">{project.techStack.join(', ')}</p>
                                    <ul className="text-sm space-y-1">
                                        {project.bullets.map((bullet, bulletIndex) => bullet && (
                                            <li key={bulletIndex} className="flex"><span className="mr-2">•</span><span className="leading-relaxed">{bullet}</span></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}

                    {(resumeData.skills.languages.length > 0 || resumeData.skills.frameworks.length > 0 || resumeData.skills.aiTools.length > 0 || resumeData.skills.databases.length > 0 || resumeData.skills.coreCS.length > 0) && (
                        <div className="mb-5">
                            <h2 className="text-sm font-bold uppercase mb-2 border-b border-black pb-1">Technical Skills</h2>
                            <div className="text-sm space-y-1">
                                {resumeData.skills.languages.length > 0 && <p><span className="font-bold">Languages:</span> {resumeData.skills.languages.join(', ')}</p>}
                                {resumeData.skills.frameworks.length > 0 && <p><span className="font-bold">Frameworks & Libraries:</span> {resumeData.skills.frameworks.join(', ')}</p>}
                                {resumeData.skills.aiTools.length > 0 && <p><span className="font-bold">AI & ML Tools:</span> {resumeData.skills.aiTools.join(', ')}</p>}
                                {resumeData.skills.databases.length > 0 && <p><span className="font-bold">Databases & Cloud:</span> {resumeData.skills.databases.join(', ')}</p>}
                                {resumeData.skills.coreCS.length > 0 && <p><span className="font-bold">Core CS:</span> {resumeData.skills.coreCS.join(', ')}</p>}
                            </div>
                        </div>
                    )}

                    {resumeData.achievements.length > 0 && resumeData.achievements[0] && (
                        <div className="mb-5">
                            <h2 className="text-sm font-bold uppercase mb-2 border-b border-black pb-1">Achievements</h2>
                            <ul className="text-sm space-y-1">
                                {resumeData.achievements.map((achievement, index) => achievement && (
                                    <li key={index} className="flex"><span className="mr-2">•</span><span className="leading-relaxed">{achievement}</span></li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ResumePreview
