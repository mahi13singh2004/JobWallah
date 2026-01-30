import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store'
import { useResumeStore } from '../store/resume.store'
import { useToastStore } from '../store/toast.store'
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
    const { showToast } = useToastStore()
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
                showToast('Resume updated successfully!', 'success')
            } else {
                const saved = await createResume(resumeData)
                setCurrentResumeId(saved._id)
                showToast('Resume saved successfully!', 'success')
                navigate('/resume/my-resumes')
            }
        } catch (error) {
            console.error('Save error:', error)
            showToast('Failed to save resume', 'error')
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
        <div className="h-screen flex flex-col bg-[#0a0a0a] text-white">
            <div className="bg-[#0a0a0a] border-b-2 border-white px-6 py-4 shrink-0">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <button onClick={handleBack} className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-semibold text-white">
                            {currentResumeId ? '✏️ Edit Resume' : '📝 Create Resume'}
                        </h1>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={handleSave}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            {currentResumeId ? 'Update' : 'Save'}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 h-full">
                <ResumePreview resumeData={resumeData} />

                <div className="w-2/5 bg-[#0a0a0a] border-l border-gray-800 flex flex-col h-full">
                    <div className="bg-[#0a0a0a] p-6 border-b border-gray-800">
                        <div className="grid grid-cols-2 gap-3">
                            {sections.map(section => (
                                <button
                                    key={section.key}
                                    onClick={() => setActiveSection(section.key)}
                                    className={`flex items-center justify-center p-4 rounded-lg text-sm font-medium transition-all duration-200 ${activeSection === section.key
                                        ? 'bg-green-600 text-white shadow-lg'
                                        : 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-gray-300 hover:text-white'
                                        }`}
                                >
                                    <span className="mr-2">{section.icon}</span>
                                    <span>{section.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 p-8 h-full overflow-hidden bg-[#0a0a0a]">
                        <div className="max-w-2xl mx-auto h-full pr-4">
                            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 pr-2">
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
        </div>
    )
}

export default Resume
