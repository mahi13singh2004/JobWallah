import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import WakeUpLoader from './components/WakeUpLoader'
import Landing from "./pages/Landing"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ResumeLanding from "./pages/ResumeLanding"
import MyResumes from "./pages/MyResumes"
import CreateResume from "./pages/CreateResume"
import Analysis from "./pages/Analysis"
import Application from './pages/Application'
import CreateApplication from './pages/CreateApplication'
import EditApplication from './pages/EditApplication'
import AiEmailGenerator from './pages/AiEmailGenerator'
import JobSearch from './pages/JobSearch'
import Premium from './pages/Premium'
import { useAuthStore } from "./store/auth.store.js"
import { useBackendWakeUp } from './hooks/useBackendWakeUp'

const App = () => {
  const { getMe } = useAuthStore()
  const { isBackendReady, isChecking } = useBackendWakeUp()

  useEffect(() => {
    if (isBackendReady) {
      getMe()
    }
  }, [getMe, isBackendReady])


  if (isChecking || !isBackendReady) {
    return <WakeUpLoader />
  }

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
        <Route path="/resume/create" element={<CreateResume />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/applications" element={<Application />} />
        <Route path="/applications/new" element={<CreateApplication />} />
        <Route path="/applications/:id" element={<EditApplication />} />
        <Route path="/ai-email/:applicationId" element={<AiEmailGenerator />} />
        <Route path="/ai-email" element={<AiEmailGenerator />} />
        <Route path="/job-search" element={<JobSearch />} />
        <Route path="/premium" element={<Premium />} />
      </Routes>
    </>
  )
}

export default App