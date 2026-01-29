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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              placeholder='Enter Your Email'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder='Enter Your Password'
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {err && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {err}
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-600">
            First Time Here? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login