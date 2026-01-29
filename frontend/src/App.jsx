import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from "./pages/Landing"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ResumeLanding from "./pages/ResumeLanding"
import MyResumes from "./pages/MyResumes"
import Resume from "./pages/CreateResume.jsx"
import { useAuthStore } from "./store/auth.store.js"

const App = () => {
  const { getMe } = useAuthStore()

  useEffect(() => {
    getMe()
  }, [getMe])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resume" element={<ResumeLanding />} />
        <Route path="/resume/my-resumes" element={<MyResumes />} />
        <Route path="/resume/create" element={<Resume />} />
      </Routes>
    </>
  )
}

export default App