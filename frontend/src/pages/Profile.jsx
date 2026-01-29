import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaFileAlt, FaBriefcase, FaRobot, FaCalendar, FaChartLine } from 'react-icons/fa'
import { useAuthStore } from "../store/auth.store.js"
import { useResumeStore } from "../store/resume.store.js"
import { useApplicationStore } from "../store/application.store.js"
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { user, err, loading, getMe } = useAuthStore()
  const { getResumes } = useResumeStore()
  const { applications, getApplications } = useApplicationStore()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalResumes: 0,
    totalApplications: 0,
    interviewsScheduled: 0,
    responseRate: 0
  })

  useEffect(() => {
    getMe()
  }, [getMe])

  useEffect(() => {
    if (!user && !loading) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    try {
      const resumes = await getResumes()
      await getApplications()
      const interviewCount = applications.filter(app => app.status === 'Interview').length
      const responseCount = applications.filter(app => app.status !== 'Applied').length
      const responseRate = applications.length > 0 ? Math.round((responseCount / applications.length) * 100) : 0

      setStats({
        totalResumes: resumes?.length || 0,
        totalApplications: applications.length,
        interviewsScheduled: interviewCount,
        responseRate: responseRate
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Please login to view your profile</p>
          <Link to="/login" className="px-6 py-3 bg-green-400 hover:bg-green-500 text-black font-medium rounded-lg transition-colors">
            Login
          </Link>
        </div>
      </div>
    )
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const recentApplications = applications.slice(0, 3)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {err && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mx-4 sm:mx-8 mt-4">
          {err}
        </div>
      )}

      <div className="pt-4 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                {getGreeting()}, {user.name}! 👋
              </h1>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg">Welcome back to your career dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-linear-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-black font-bold text-lg sm:text-xl">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:border-green-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <FaFileAlt className="w-4 h-4 lg:w-6 lg:h-6 text-green-400" />
                </div>
                <span className="text-lg lg:text-2xl font-bold text-green-400">{stats.totalResumes}</span>
              </div>
              <h3 className="text-white font-semibold mb-1 text-sm lg:text-base">Resumes Created</h3>
              <p className="text-gray-400 text-xs lg:text-sm">Professional resumes ready to use</p>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <FaBriefcase className="w-4 h-4 lg:w-6 lg:h-6 text-blue-400" />
                </div>
                <span className="text-lg lg:text-2xl font-bold text-blue-400">{stats.totalApplications}</span>
              </div>
              <h3 className="text-white font-semibold mb-1 text-sm lg:text-base">Applications Sent</h3>
              <p className="text-gray-400 text-xs lg:text-sm">Total job applications submitted</p>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <FaCalendar className="w-4 h-4 lg:w-6 lg:h-6 text-purple-400" />
                </div>
                <span className="text-lg lg:text-2xl font-bold text-purple-400">{stats.interviewsScheduled}</span>
              </div>
              <h3 className="text-white font-semibold mb-1 text-sm lg:text-base">Interviews</h3>
              <p className="text-gray-400 text-xs lg:text-sm">Scheduled and completed</p>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:border-yellow-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <FaChartLine className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-400" />
                </div>
                <span className="text-lg lg:text-2xl font-bold text-yellow-400">{stats.responseRate}%</span>
              </div>
              <h3 className="text-white font-semibold mb-1 text-sm lg:text-base">Response Rate</h3>
              <p className="text-gray-400 text-xs lg:text-sm">Applications with responses</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-1">
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 h-full">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h2 className="text-lg lg:text-xl font-bold text-white">Profile Information</h2>
                </div>

                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <FaUser className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs lg:text-sm">Full Name</p>
                      <p className="text-white font-medium text-sm lg:text-base">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400 text-xs lg:text-sm">@</span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs lg:text-sm">Email Address</p>
                      <p className="text-white font-medium text-sm lg:text-base truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <FaCalendar className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs lg:text-sm">Member Since</p>
                      <p className="text-white font-medium text-sm lg:text-base">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h2 className="text-lg lg:text-xl font-bold text-white">Recent Applications</h2>
                  <Link
                    to="/applications"
                    className="text-green-400 hover:text-green-300 text-xs lg:text-sm font-medium transition-colors"
                  >
                    View All →
                  </Link>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  {recentApplications.length > 0 ? (
                    <div className="space-y-3 lg:space-y-4">
                      {recentApplications.map((app, index) => (
                        <div key={index} className="flex items-center justify-between p-3 lg:p-4 bg-[#111111] rounded-xl border border-gray-800/50">
                          <div className="flex items-center space-x-3 lg:space-x-4 min-w-0 flex-1">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                              <FaBriefcase className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-white font-medium text-sm lg:text-base truncate">{app.role}</h3>
                              <p className="text-gray-400 text-xs lg:text-sm truncate">{app.company}</p>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${app.status === 'Applied' ? 'bg-blue-500/20 text-blue-300' :
                              app.status === 'Interview' ? 'bg-yellow-500/20 text-yellow-300' :
                                app.status === 'Offer' ? 'bg-green-500/20 text-green-300' :
                                  'bg-red-500/20 text-red-300'
                              }`}>
                              {app.status}
                            </span>
                            {app.appliedDate && (
                              <p className="text-gray-500 text-xs mt-1 hidden sm:block">
                                {new Date(app.appliedDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <FaBriefcase className="w-10 h-10 lg:w-12 lg:h-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4 text-sm lg:text-base">No applications yet</p>
                      <Link
                        to="/applications/new"
                        className="inline-block px-4 py-2 lg:px-6 lg:py-3 bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-colors text-sm lg:text-base"
                      >
                        Add Your First Application
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-8">
            <h2 className="text-lg lg:text-2xl font-bold text-white mb-4 lg:mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              <Link
                to="/resume/create"
                className="bg-linear-to-br from-green-500/10 to-[#1a1a1a] border border-green-500/20 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:border-green-500/60 transition-all duration-300 group"
              >
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform">
                  <FaFileAlt className="w-4 h-4 lg:w-6 lg:h-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm lg:text-base">Create Resume</h3>
                <p className="text-gray-400 text-xs lg:text-sm">Build a new professional resume</p>
              </Link>

              <Link
                to="/applications/new"
                className="bg-linear-to-br from-blue-500/10 to-[#1a1a1a] border border-blue-500/20 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:border-blue-500/60 transition-all duration-300 group"
              >
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform">
                  <FaBriefcase className="w-4 h-4 lg:w-6 lg:h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm lg:text-base">Track Application</h3>
                <p className="text-gray-400 text-xs lg:text-sm">Add a new job application</p>
              </Link>

              <Link
                to="/analysis"
                className="bg-linear-to-br from-purple-500/10 to-[#1a1a1a] border border-purple-500/20 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:border-purple-500/60 transition-all duration-300 group"
              >
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform">
                  <FaRobot className="w-4 h-4 lg:w-6 lg:h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm lg:text-base">AI Analysis</h3>
                <p className="text-gray-400 text-xs lg:text-sm">Analyze resume with AI</p>
              </Link>

              <Link
                to="/job-search"
                className="bg-linear-to-br from-yellow-500/10 to-[#1a1a1a] border border-yellow-500/20 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:border-yellow-500/60 transition-all duration-300 group"
              >
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform">
                  <FaChartLine className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-400" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm lg:text-base">Find Jobs</h3>
                <p className="text-gray-400 text-xs lg:text-sm">Search for new opportunities</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile