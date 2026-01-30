import { createContext, useContext } from 'react'
import { useToast } from '../hooks/useToast'
import ToastContainer from '../components/ToastContainer'

const ToastContext = createContext()

export const useToastContext = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToastContext must be used within ToastProvider')
    }
    return context
}

export const ToastProvider = ({ children }) => {
    const { toasts, showToast, removeToast } = useToast()

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    )
}