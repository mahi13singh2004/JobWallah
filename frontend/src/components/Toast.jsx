import { useState, useEffect } from 'react'

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(onClose, 300) // Wait for animation to complete
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    const getToastStyles = () => {
        const baseStyles = "fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 max-w-sm"

        if (!isVisible) {
            return `${baseStyles} translate-x-full opacity-0`
        }

        switch (type) {
            case 'success':
                return `${baseStyles} bg-green-500 text-white`
            case 'error':
                return `${baseStyles} bg-red-500 text-white`
            case 'warning':
                return `${baseStyles} bg-yellow-500 text-white`
            case 'info':
                return `${baseStyles} bg-blue-500 text-white`
            default:
                return `${baseStyles} bg-gray-800 text-white`
        }
    }

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✓'
            case 'error':
                return '✕'
            case 'warning':
                return '⚠'
            case 'info':
                return 'ℹ'
            default:
                return '•'
        }
    }

    return (
        <div className={getToastStyles()}>
            <div className="flex items-center space-x-3">
                <span className="text-lg font-bold">{getIcon()}</span>
                <span className="font-medium">{message}</span>
                <button
                    onClick={() => {
                        setIsVisible(false)
                        setTimeout(onClose, 300)
                    }}
                    className="ml-auto text-white hover:text-gray-200 font-bold text-lg"
                >
                    ×
                </button>
            </div>
        </div>
    )
}

export default Toast