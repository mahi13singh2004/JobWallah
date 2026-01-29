import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store'
import { useResumeStore } from '../store/resume.store'
import ResumePreview from '../components/resume/ResumePreview'
import BasicDetailsEditor from '../components/resume/editors/BasicDetailsEditor'
import SummaryEditor from '../components/resume/editors/SummaryEditor'
import EducationEditor from '../components/resume/editors/EducationEditor'
import ExperienceEditor from '../components/resume/editors/ExperienceEditor'
import ProjectsEditor from '../components/resume/editors/ProjectsEditor'
import SkillsEditor from '../components/resume/editors/SkillsEditor'
import AchievementsEditor from '../components/resume/editors/AchievementsEditor'

const Resume = () => {
    const { user } = useAuthStore()
    const { downloadResume, createResume, updateResume } = useResumeStore()
    const location = useLocation()
    const navigate = useNavigate()

    const [activeSection, setActiveSection] = useState('basic')
    const [currentResumeId, setCurrentResumeId] = useState(null)
    const [resumeData, setResumeData] = useState({
        title: 'Professional Resume',
        personalInfo: {
            name: user?.name || 'Your Name',
            email: user?.email || 'your.email@example.com',
            phone: '+91 9876543210',
            location: 'City, State',
            linkedin: 'linkedin.com/in/yourname',
            github: 'github.com/yourname'
        },
        summary: 'I am a web developer having expertise in frontend development and experience in back-end development. I design and develop web applications using the latest technologies to deliver the product with quality code.',
        education: [{
            institution: 'Your University',
            degree: 'Bachelor of Engineering in Computer Science',
            location: 'City, State',
            startDate: 'Aug 2020',
            endDate: 'May 2024'
        }],
        experience: [{
            role: 'Software Developer Intern',
            company: 'Tech Company',
            location: 'City, State',
            startDate: 'Jun 2023',
            endDate: 'Aug 2023',
            bullets: [
                'Built web applications using modern technologies',
                'Collaborated with team members on various projects',
                'Implemented new features and fixed bugs'
            ]
        }],
        projects: [{
            name: 'Project Name',
            techStack: ['React', 'Node.js', 'MongoDB'],
            startDate: 'Jan 2023',
            endDate: 'Mar 2023',
            bullets: [
                'Developed a full-stack web application',
                'Implemented user authentication and authorization',
                'Created responsive UI components'
            ]
        }],
        skills: {
            languages: ['JavaScript', 'Python', 'Java'],
            frameworks: ['React', 'Node.js', 'Express'],
            aiTools: ['OpenAI API', 'TensorFlow'],
            databases: ['MongoDB', 'MySQL'],
            coreCS: ['Data Structures', 'Algorithms', 'OOP']
        },
        achievements: [
            'Won first place in college hackathon',
            'Completed 100+ coding challenges on LeetCode'
        ]
    })

    useEffect(() => {
        if (location.state?.resume) {
            const resume = location.state.resume
            setResumeData(resume)
            setCurrentResumeId(resume._id)
        }
    }, [location.state])

    const handleSave = async () => {
        try {
            if (currentResumeId) {
                await updateResume(currentResumeId, resumeData)
                alert('Resume updated!')
            } else {
                const saved = await createResume(resumeData)
                setCurrentResumeId(saved._id)
                alert('Resume saved!')
                navigate('/resume/my-resumes')
            }
        } catch (error) {
            console.error('Save error:', error)
            alert('Failed to save')
        }
    }

    const handleDownload = async () => {
        try {
            const blob = await downloadResume(resumeData)
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (error) {
            console.error('Download error:', error)
        }
    }

    const handleBack = () => {
        navigate('/resume')
    }

    const createNewResume = () => {
        setResumeData({
            title: 'Professional Resume',
            personalInfo: {
                name: user?.name || 'Your Name',
                email: user?.email || 'your.email@example.com',
                phone: '+91 9876543210',
                location: 'City, State',
                linkedin: 'linkedin.com/in/yourname',
                github: 'github.com/yourname'
            },
            summary: 'I am a web developer having expertise in frontend development and experience in back-end development.',
            education: [{ institution: '', degree: '', location: '', startDate: '', endDate: '' }],
            experience: [{ role: '', company: '', location: '', startDate: '', endDate: '', bullets: [''] }],
            projects: [{ name: '', techStack: [], startDate: '', endDate: '', bullets: [''] }],
            skills: { languages: [], frameworks: [], aiTools: [], databases: [], coreCS: [] },
            achievements: []
        })
        setCurrentResumeId(null)
    }

    const updateResumeData = (section, data) => {
        setResumeData(prev => ({ ...prev, [section]: data }))
    }

    const sections = [
        { key: 'basic', label: 'Basic', icon: '👤' },
        { key: 'summary', label: 'Summary', icon: '📝' },
        { key: 'education', label: 'Education', icon: '🎓' },
        { key: 'experience', label: 'Experience', icon: '💼' },
        { key: 'projects', label: 'Projects', icon: '🚀' },
        { key: 'skills', label: 'Skills', icon: '⚡' },
        { key: 'achievements', label: 'Achievements', icon: '🏆' }
    ]

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <div className="bg-white shadow border-b px-6 py-3 shrink-0">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <button onClick={handleBack} className="text-gray-600 hover:text-gray-800">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <h1 className="text-lg font-semibold">{currentResumeId ? 'Edit Resume' : 'Create Resume'}</h1>
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={handleSave} className="bg-green-600 text-white px-4 py-1.5 rounded text-sm hover:bg-green-700">{currentResumeId ? 'Update' : 'Save'}</button>
                        <button onClick={handleDownload} className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700">Download PDF</button>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <ResumePreview resumeData={resumeData} />

                <div className="w-1/2 bg-white border-l overflow-hidden flex flex-col">
                    <div className="sticky top-0 bg-white z-10 p-4 border-b shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                            {sections.map(section => (
                                <button key={section.key} onClick={() => setActiveSection(section.key)} className={`flex items-center justify-center p-2.5 rounded-lg text-sm font-medium transition ${activeSection === section.key ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 hover:bg-gray-200'}`}>
                                    <span className="mr-1.5">{section.icon}</span><span>{section.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="max-w-2xl mx-auto">
                            {activeSection === 'basic' && <BasicDetailsEditor data={resumeData.personalInfo} onChange={(data) => updateResumeData('personalInfo', data)} />}
                            {activeSection === 'summary' && <SummaryEditor data={resumeData.summary} onChange={(data) => updateResumeData('summary', data)} />}
                            {activeSection === 'education' && <EducationEditor data={resumeData.education} onChange={(data) => updateResumeData('education', data)} />}
                            {activeSection === 'experience' && <ExperienceEditor data={resumeData.experience} onChange={(data) => updateResumeData('experience', data)} />}
                            {activeSection === 'projects' && <ProjectsEditor data={resumeData.projects} onChange={(data) => updateResumeData('projects', data)} />}
                            {activeSection === 'skills' && <SkillsEditor data={resumeData.skills} onChange={(data) => updateResumeData('skills', data)} />}
                            {activeSection === 'achievements' && <AchievementsEditor data={resumeData.achievements} onChange={(data) => updateResumeData('achievements', data)} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resume
