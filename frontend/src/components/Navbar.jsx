import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store.js'

const Navbar = () => {
  const { user, logout } = useAuthStore()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          MyApp
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
              <Link to="/resume" className="hover:underline">
                Resume
              </Link>
              <Link to="/analysis" className="hover:underline">
                Analysis
              </Link>
              <Link to="/applications" className="hover:underline">
                Applications
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar