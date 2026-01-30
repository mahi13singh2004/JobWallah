import Toast from './Toast'
import { useToastStore } from '../store/toast.store'

const ToastContainer = () => {
    const { toasts, removeToast } = useToastStore()

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map((toast, index) => (
                <div
                    key={toast.id}
                    style={{
                        transform: `translateY(${index * 80}px)`,
                        zIndex: 1000 - index
                    }}
                >
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        onClose={() => removeToast(toast.id)}
                    />
                </div>
            ))}
        </div>
    )
}

export default ToastContainer