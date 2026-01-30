import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/auth.store.js"

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const { loading, err, login, user } = useAuthStore()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login(form)
      if (res) navigate("/")
    }
    catch (error) {
    }
  }

  const handleRecruiterLogin = () => {
    setForm({
      email: "recruiter@gmail.com",
      password: "recruiter123456"
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col lg:flex-row">
      {/* Form Section */}
      <div className="flex-1 lg:w-3/7 flex justify-center lg:justify-end items-start px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-8 lg:pb-12">
        <div className="w-full max-w-sm sm:max-w-md mt-2 sm:mt-4 lg:mt-0">
          <div className="text-center mb-3 sm:mb-4 lg:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
              Welcome back!
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm">Sign in to continue your journey</p>
          </div>

          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl">
            <form className="space-y-1 sm:space-y-2" onSubmit={handleSubmit}>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Email</label>
                  <input
                    placeholder='Enter your email'
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    type="email"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 lg:py-4 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                </div>
                <div className='pb-3 sm:pb-4 lg:pb-6'>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Password</label>
                  <input
                    placeholder='Enter your password'
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    type="password"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 lg:py-4 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                </div>
              </div>

              {err && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm">
                  {err}
                </div>
              )}

              <button
                type='submit'
                disabled={loading}
                className="w-full py-2.5 sm:py-3 lg:py-2.5 pt-2.5 sm:pt-3 px-4 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-black font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20 text-sm sm:text-base"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>

              {/* Recruiter Demo Login */}
              <div className="mt-3 sm:mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className="px-2 bg-[#1a1a1a] text-gray-400">Demo Account</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRecruiterLogin}
                  className="w-full mt-3 py-2.5 sm:py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/20 text-sm sm:text-base flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>Try as Recruiter</span>
                </button>
              </div>
            </form>

            <div className="mt-3 sm:mt-4 text-center pt-2 sm:pt-3">
              <p className="text-sm sm:text-base lg:text-lg text-gray-400">
                First time here?{' '}
                <Link to="/signup" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-4/7 items-center justify-center">
        <img src="/assets/logo.png" alt="Logo" className="w-0.99 h-4/5" />
      </div>
    </div>
  )
}

export default Login