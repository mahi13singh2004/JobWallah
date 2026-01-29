import { Link } from 'react-router-dom'
import { FaHome, FaChevronDown, FaUser, FaFileAlt, FaRobot, FaBriefcase, FaSearch, FaCog } from "react-icons/fa"
import { useAuthStore } from '../store/auth.store.js'
import { useState } from 'react'

const Navbar = () => {
  const { user, logout } = useAuthStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const features = [
    { name: 'Resume Builder', path: '/resume', icon: FaFileAlt, description: 'Create professional resumes' },
    { name: 'AI Analysis', path: '/analysis', icon: FaRobot, description: 'Analyze resumes with AI' },
    { name: 'Applications', path: '/applications', icon: FaBriefcase, description: 'Track job applications' },
    { name: 'Job Search', path: '/job-search', icon: FaSearch, description: 'Find new opportunities' }
  ]

  return (
    <nav className="bg-[#0a0a0a] sticky top-0 z-50">
      <div className="container mx-auto px-9">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/src/assets/logo.png" alt="Logo" className="h-22" />
          </Link>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="flex items-center justify-center w-10 h-10 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800 rounded-lg transition-all duration-200 group">
              <FaHome className="text-gray-300 group-hover:text-white transition-colors text-lg" />
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {/* Features Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm font-medium cursor-pointer"
                  >
                    <FaCog className="w-4 h-4" />
                    <span>Features</span>
                    <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-[#1a1a1a] border border-gray-800 rounded-xl shadow-2xl z-50">
                      <div className="py-2">
                        {features.map((feature, index) => {
                          const IconComponent = feature.icon
                          return (
                            <Link
                              key={index}
                              to={feature.path}
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center space-x-3 px-4 py-3 hover:bg-[#252525] transition-colors group cursor-pointer"
                            >
                              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                <IconComponent className="w-4 h-4 text-green-400" />
                              </div>
                              <div>
                                <p className="text-white text-sm font-medium">{feature.name}</p>
                                <p className="text-gray-400 text-xs">{feature.description}</p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Link */}
                <Link to="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm font-medium">
                  <FaUser className="w-4 h-4" />
                  <span>Profile</span>
                </Link>

                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-linear-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-black font-semibold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-300">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800 text-white text-sm font-medium rounded-lg transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors text-sm font-medium cursor-pointer">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-black font-semibold rounded-lg transition-all duration-200 text-sm shadow-lg shadow-green-500/20 cursor-pointer">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar