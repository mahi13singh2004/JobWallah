import Razorpay from "razorpay"
import crypto from "crypto"
import User from "../models/user.model.js"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export const createOrder = async (req, res) => {
    try {
        console.log('Creating Razorpay order...')
        console.log('User ID:', req.user?.id || req.user?._id)
        console.log('Razorpay Key ID:', process.env.RAZORPAY_KEY_ID ? 'Set' : 'Not set')
        console.log('Razorpay Key Secret:', process.env.RAZORPAY_KEY_SECRET ? 'Set' : 'Not set')

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            })
        }

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({
                success: false,
                message: "Razorpay keys not configured"
            })
        }

        const userId = req.user.id || req.user._id
        const options = {
            amount: 9900,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                userId: userId,
                plan: "premium_lifetime"
            }
        }

        console.log('Order options:', options)
        const order = await razorpay.orders.create(options)
        console.log('Order created:', order.id)

        await User.findByIdAndUpdate(userId, {
            razorpayOrderId: order.id
        })

        res.status(200).json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency
            }
        })
    } catch (error) {
        console.error('Razorpay order creation error:', error)
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message
        })
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex")

        if (expectedSignature === razorpay_signature) {
            await User.findByIdAndUpdate(req.user.id, {
                isPremium: true,
                premiumPurchaseDate: new Date(),
                razorpayPaymentId: razorpay_payment_id,
                razorpayOrderId: razorpay_order_id
            })

            res.status(200).json({
                success: true,
                message: "Payment verified successfully"
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Payment verification failed"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Payment verification failed"
        })
    }
}

export const getPaymentStatus = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("isPremium premiumPurchaseDate")

        res.status(200).json({
            success: true,
            isPremium: user.isPremium,
            premiumPurchaseDate: user.premiumPurchaseDate
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get payment status"
        })
    }
}