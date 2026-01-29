import { Link } from 'react-router-dom'
import { FaFileAlt, FaSearch, FaBriefcase, FaRobot, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import { useAuthStore } from '../store/auth.store'

const Landing = () => {
  const { user } = useAuthStore()

  const features = [
    {
      icon: FaFileAlt,
      title: "Resume Builder",
      description: "Create professional resumes with AI-powered suggestions and ATS-friendly templates.",
      link: user ? "/resume" : "/login"
    },
    {
      icon: FaRobot,
      title: "AI Analysis",
      description: "Get intelligent insights on your resume and job descriptions with advanced AI analysis.",
      link: user ? "/analysis" : "/login"
    },
    {
      icon: FaBriefcase,
      title: "Application Tracker",
      description: "Keep track of all your job applications, interviews, and follow-ups in one place.",
      link: user ? "/applications" : "/login"
    },
    {
      icon: FaSearch,
      title: "Job Search",
      description: "Discover new job opportunities with our smart job search engine and filters.",
      link: user ? "/job-search" : "/login"
    }
  ]
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">

      {/* Main Hero Section */}
      <div className="relative z-10 pt-4 pb-8 px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-20 max-w-7xl mx-auto">
          <div className="w-full lg:w-2/5 space-y-6 lg:space-y-8 pt-4 lg:pt-8">
            <div className="space-y-6">
              <h1 className="text-6xl font-bold leading-tight">
                Your Path to{' '}
                <span className="text-green-400">
                  Career Success
                </span>
                <br />
                Starts Here
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                Build resumes, analyze job descriptions, discover new job opportunities, and track your applications—all in one place.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/signup"
                className="inline-block px-8 py-3 bg-green-400 hover:bg-green-500 text-black font-medium rounded-md transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-3/5 flex items-center justify-center mt-8 lg:mt-0">
            <div className="text-center w-full">
              <div className="flex items-center justify-center mb-8">
                <img src="/src/assets/Home.png" alt="Home Image" className="w-full h-auto max-w-md lg:max-w-lg xl:max-w-xl object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-4 pb-8 px-4 sm:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">🚀 Powerful Features</h2>
            <p className="text-gray-400 text-lg mb-2">Everything you need to land your dream job</p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From AI-powered resume building to smart job tracking, our comprehensive suite of tools
              helps you streamline your job search and stand out from the competition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-150">
            {/* Resume Builder - Large card */}
            <Link
              to={features[0].link}
              className="md:col-span-2 md:row-span-2 bg-linear-to-br from-green-500/10 via-[#1a1a1a] to-[#1a1a1a] border border-green-500/20 rounded-3xl p-8 hover:border-green-500/60 transition-all duration-500 transform hover:scale-[1.02] hover:-rotate-1 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-all duration-500"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaFileAlt className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    📝 Resume Builder
                  </h3>
                  <p className="text-green-400/80 text-sm font-medium mb-4">AI-Powered Professional Resumes</p>
                  <p className="text-gray-300 text-base leading-relaxed mb-4">
                    It's no secret that creating resumes from scratch is a huge pain. To simplify this, we present our Resume Builder - just edit your information accordingly, add details, and done! You're ready to go.
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Not sure how to put your achievements and work in words? Don't worry, our built-in AI will help you frame your words and get you that perfect resume.
                  </p>
                </div>
                <div className="flex items-center text-green-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>Get Started</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* AI Analysis - Top right */}
            <Link
              to={features[1].link}
              className="md:col-span-2 bg-linear-to-r from-purple-500/10 to-[#1a1a1a] border border-purple-500/20 rounded-3xl p-6 hover:border-purple-500/60 transition-all duration-500 transform hover:scale-105 hover:rotate-1 group relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaRobot className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      🤖 AI Analysis
                    </h3>
                    <p className="text-purple-400/80 text-sm font-medium mb-4">Smart Resume & Job Matching</p>
                    <p className="text-gray-300 text-base leading-relaxed">
                      Applying for a job and not sure if it's the right fit for you? Don't worry! Just paste the job description along with your resume and get instant suggestions on what's wrong and what to fix.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end text-purple-400 font-medium group-hover:translate-x-2 transition-transform duration-300 mt-6">
                  <span>Get Started</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Application Tracker - Bottom right */}
            <Link
              to={features[2].link}
              className="bg-linear-to-br from-blue-500/10 to-[#1a1a1a] border border-blue-500/20 rounded-3xl p-6 hover:border-blue-500/60 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 group relative overflow-hidden"
            >
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaBriefcase className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    📊 Application Tracker
                  </h3>
                  <p className="text-blue-400/80 text-xs font-medium mb-2">Organize Your Job Hunt</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    Keep track of all your applications in one organized dashboard.
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed mb-2">
                    Applying for jobs is good, but tracking what you've applied for is even more important. Use our platform to stay organized and never miss a follow-up.
                  </p>
                </div>
                <div className="flex items-center text-blue-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>Get Started</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Job Search - Bottom right corner */}
            <Link
              to={features[3].link}
              className="bg-linear-to-tl from-yellow-500/10 to-[#1a1a1a] border border-yellow-500/20 rounded-3xl p-6 hover:border-yellow-500/60 transition-all duration-500 transform hover:scale-105 hover:rotate-1 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-16 h-16 bg-yellow-500/10 rounded-full blur-lg group-hover:bg-yellow-500/20 transition-all duration-500"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaSearch className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                    🔍 Job Search
                  </h3>
                  <p className="text-yellow-400/80 text-xs font-medium mb-2">Smart Job Discovery</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    Discover opportunities with intelligent search filters.
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed mb-2">
                    Searching for a job can be overwhelming. Use our platform to find jobs that are relevant just for you, with smart filtering and personalized recommendations.
                  </p>
                </div>
                <div className="flex items-center text-yellow-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>Get Started</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="relative z-10 bg-[#0a0a0a] border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-400">
              <a
                href="mailto:mahi13singh2004@gmail.com"
                className="flex items-center space-x-2 hover:text-green-400 transition-colors"
              >
                <FaEnvelope className="w-4 h-4" />
                <span>mahi13singh2004@gmail.com</span>
              </a>
              <span>•</span>
              <a
                href="https://www.linkedin.com/in/mahi13singh2004/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
              >
                <FaLinkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span>•</span>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
              >
                <FaGithub className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing