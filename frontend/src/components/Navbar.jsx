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
      <div className="container mx-auto px-4 sm:px-6 lg:px-9">
        <div className="flex justify-between sm:justify-between items-center h-16 sm:h-20">
          {/* Logo - hidden on mobile */}
          <Link to="/" className="hidden sm:flex items-center space-x-2">
            <img src="/assets/logo.png" alt="Logo" className="h-16 sm:h-22" />
          </Link>

          {/* Home button - centered on mobile, absolute positioned on desktop */}
          <div className="sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
            <Link to="/" className="flex items-center justify-center w-10 h-10 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800 rounded-lg transition-all duration-200 group">
              <FaHome className="text-gray-300 group-hover:text-white transition-colors text-lg" />
            </Link>
          </div>

          {/* Navigation items - centered on mobile */}
          <div className="flex items-center justify-center sm:justify-end space-x-3 sm:space-x-4 lg:space-x-6">
            {user ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-1 sm:space-x-2 text-gray-300 hover:text-white transition-colors text-xs sm:text-sm font-medium cursor-pointer"
                  >
                    <FaCog className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Features</span>
                    <FaChevronDown className={`w-2 h-2 sm:w-3 sm:h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full right-0 sm:left-0 mt-2 w-56 sm:w-64 bg-[#1a1a1a] border border-gray-800 rounded-xl shadow-2xl z-50">
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
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                              </div>
                              <div>
                                <p className="text-white text-xs sm:text-sm font-medium">{feature.name}</p>
                                <p className="text-gray-400 text-xs hidden sm:block">{feature.description}</p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <Link to="/profile" className="flex items-center space-x-1 sm:space-x-2 text-gray-300 hover:text-white transition-colors text-xs sm:text-sm font-medium">
                  <FaUser className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                {!user.isPremium && (
                  <Link to="/premium" className="flex items-center space-x-1 sm:space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors text-xs sm:text-sm font-medium">
                    <span className="text-xs">★</span>
                    <span className="hidden sm:inline">Premium</span>
                  </Link>
                )}

                {/* User info - simplified on mobile */}
                <div className="flex items-center space-x-2 sm:space-x-4 ml-2 sm:ml-4 pl-2 sm:pl-4 border-l border-gray-800">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-linear-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-black font-semibold text-xs sm:text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    {/* User name hidden on mobile */}
                    <span className="text-xs sm:text-sm text-gray-300 hidden sm:inline">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-2 py-1 sm:px-4 sm:py-2 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800 text-white text-xs sm:text-sm font-medium rounded-lg transition-all duration-200"
                  >
                    <span className="sm:hidden">Out</span>
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm font-medium cursor-pointer">
                  Login
                </Link>
                <Link to="/signup" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-black font-semibold rounded-lg transition-all duration-200 text-xs sm:text-sm shadow-lg shadow-green-500/20 cursor-pointer">
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