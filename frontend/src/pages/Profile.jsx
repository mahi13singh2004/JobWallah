import { useEffect } from 'react'
import { useAuthStore } from "../store/auth.store.js"
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { user, err, loading, getMe } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    getMe()
  }, [getMe])

  useEffect(() => {
    if (!user && !loading) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  if (loading) return <div className="p-4">Loading...</div>

  if (!user) return <div className="p-4">Please login to view profile</div>

  return (
    <div className="container mx-auto p-4">
      {err && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {err}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <p className="text-gray-900">{user.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <p className="text-gray-900">{user.email}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile