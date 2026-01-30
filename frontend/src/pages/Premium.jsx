import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePaymentStore } from '../store/payment.store.js'
import { useAuthStore } from '../store/auth.store.js'
import { useToast } from '../hooks/useToast.js'

const Premium = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const { createOrder, verifyPayment, isLoading, error } = usePaymentStore()
    const { user, checkAuth } = useAuthStore()
    const { showToast } = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.isPremium) {
            navigate('/profile')
        }
    }, [user, navigate])

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.onload = () => resolve(true)
            script.onerror = () => resolve(false)
            document.body.appendChild(script)
        })
    }

    const handlePayment = async () => {
        setIsProcessing(true)
        try {
            if (customAmount < 99) {
                showToast('Minimum amount is ₹99', 'error')
                return
            }

            const scriptLoaded = await loadRazorpayScript()
            if (!scriptLoaded) {
                showToast('Failed to load payment gateway', 'error')
                return
            }

            const order = await createOrder(customAmount)

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'JobWallah Premium',
                description: 'Lifetime Premium Access',
                order_id: order.id,
                handler: async (response) => {
                    try {
                        await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                        showToast('Payment successful! Welcome to Premium!', 'success')
                        await checkAuth()
                        navigate('/profile')
                    } catch (error) {
                        showToast('Payment verification failed', 'error')
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email
                },
                theme: {
                    color: '#3B82F6'
                }
            }

            const razorpay = new window.Razorpay(options)
            razorpay.open()
        } catch (error) {
            showToast(error.message || 'Payment failed', 'error')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Upgrade to Premium
                    </h1>
                    <p className="text-xl text-gray-600">
                        Unlock unlimited job searches and premium features
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Free Plan</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                <span>3 job searches per day</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                <span>Basic resume builder</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                <span>Application tracking</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-red-500 mr-3">✗</span>
                                <span className="text-gray-500">Unlimited job searches</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-red-500 mr-3">✗</span>
                                <span className="text-gray-500">Priority support</span>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className="text-3xl font-bold text-gray-900">Free</div>
                        </div>
                    </div>

                    <div className="bg-blue-600 rounded-lg shadow-lg p-8 text-white relative">
                        <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold">
                            POPULAR
                        </div>
                        <h2 className="text-2xl font-bold mb-6">Premium Plan</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="text-green-400 mr-3">✓</span>
                                <span>Unlimited job searches</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-green-400 mr-3">✓</span>
                                <span>Advanced resume builder</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-green-400 mr-3">✓</span>
                                <span>Application tracking</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-green-400 mr-3">✓</span>
                                <span>AI-powered suggestions</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-green-400 mr-3">✓</span>
                                <span>Priority support</span>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className="text-3xl font-bold">₹999</div>
                            <div className="text-blue-200">One-time payment</div>
                        </div>
                        <button
                            onClick={handlePayment}
                            disabled={isLoading || isProcessing}
                            className="w-full mt-6 bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading || isProcessing ? 'Processing...' : 'Upgrade Now'}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Premium