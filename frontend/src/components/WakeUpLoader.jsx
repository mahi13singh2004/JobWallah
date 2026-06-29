import { useState, useEffect } from 'react'

const WakeUpLoader = ({ onBackendReady }) => {
    const [dots, setDots] = useState('')
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [status, setStatus] = useState('Waking up backend...')

    useEffect(() => {
        const dotInterval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.')
        }, 500)

        const timeInterval = setInterval(() => {
            setTimeElapsed(prev => prev + 1)
        }, 1000)

        return () => {
            clearInterval(dotInterval)
            clearInterval(timeInterval)
        }
    }, [])

    useEffect(() => {
        if (timeElapsed > 30) {
            setStatus('Still waking up, almost there...')
        }
        if (timeElapsed > 50) {
            setStatus('Just a few more seconds...')
        }
    }, [timeElapsed])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <div className="text-center space-y-10 px-6 max-w-2xl">
                <div className="mb-10">
                    <img src="/assets/logo.png" alt="JobWallah" className="h-24 mx-auto" />
                </div>

                <div className="w-16 h-16 mx-auto mb-8">
                    <div className="w-full h-full border-4 border-gray-700 border-t-gray-400 rounded-full animate-spin"></div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-3xl font-semibold text-gray-100">
                        {status}{dots}
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed">
                        The backend server is starting up. This typically takes 30-60 seconds on initial load.
                    </p>

                    <div className="text-base text-gray-500 space-y-3 pt-4">
                        <p>Time elapsed: {formatTime(timeElapsed)}</p>
                        <p className="text-sm">Please wait, do not refresh</p>
                    </div>
                </div>

                <div className="w-full max-w-lg mx-auto pt-6">
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                            className="bg-gray-500 h-1.5 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min((timeElapsed / 60) * 100, 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div className="mt-10 p-6 bg-gray-900 border border-gray-800 rounded-lg max-w-lg mx-auto">
                    <p className="text-base text-gray-400 leading-relaxed">
                        Free tier services sleep after inactivity. The application will respond normally once the server is active.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default WakeUpLoader