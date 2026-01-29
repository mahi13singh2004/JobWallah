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
      console.log(error)
    }
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#0a0a0a] overflow-hidden flex flex-col lg:flex-row">
      <div className="lg:hidden flex justify-center items-center py-8">
        <img src="/src/assets/logo.png" alt="Logo" className="w-32 h-32 object-contain" />
      </div>

      <div className="pb-12 w-full lg:w-3/7 flex justify-center lg:justify-end items-center px-4 sm:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome back!
            </h2>
            <p className="text-gray-400 text-sm">Sign in to continue your journey</p>
          </div>

          <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 sm:p-8 pb-8 sm:pb-12 shadow-2xl">
            <form className="space-y-2" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    placeholder='Enter your email'
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    type="email"
                    className="w-full px-4 py-3 sm:py-4 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className='pb-6 sm:pb-8'>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <input
                    placeholder='Enter your password'
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    type="password"
                    className="w-full px-4 py-3 sm:py-4 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {err && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {err}
                </div>
              )}

              <button
                type='submit'
                disabled={loading}
                className="w-full py-3 sm:py-2.5 pt-4 px-4 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-black font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="mt-5 text-center pt-4">
              <p className="text-base sm:text-lg text-gray-400">
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
        <img src="/src/assets/logo.png" alt="Logo" className="w-0.99 h-4/5" />
      </div>
    </div>
  )
}

export default Login