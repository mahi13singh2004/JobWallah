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
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
            <div className="text-center space-y-8 px-4">
                <div className="mb-8">
                    <img src="/assets/logo.png" alt="JobWallah" className="h-20 mx-auto" />
                </div>

                {/* Loading Animation */}
                <div className="relative">
                    <div className="w-20 h-20 mx-auto mb-6">
                        <div className="w-full h-full border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>

                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 border-2 border-blue-400 rounded-full animate-pulse opacity-30"></div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">
                        {status}{dots}
                    </h2>

                    <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
                        Our backend is starting up on Render. This usually takes up to 60 seconds on the first load.
                    </p>

                    <div className="text-sm text-gray-400 space-y-2">
                        <p>Time elapsed: {formatTime(timeElapsed)}</p>
                        <p className="text-xs">Please don't refresh the page</p>
                    </div>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-linear-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${Math.min((timeElapsed / 60) * 100, 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-gray-800/50 rounded-lg max-w-md mx-auto">
                    <p className="text-sm text-gray-300">
                        💡 <strong>Did you know?</strong> This happens because Render puts free services to sleep after inactivity.
                        Once awake, My app will be lightning fast!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default WakeUpLoader