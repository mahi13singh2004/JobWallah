import Razorpay from "razorpay"
import crypto from "crypto"
import User from "../models/user.model.js"
import Payment from "../models/payment.model.js"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export const createOrder = async (req, res) => {
    try {
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
            amount: 2900,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                userId: userId,
                plan: "premium_lifetime"
            }
        }

        const order = await razorpay.orders.create(options)

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

            await Payment.create({
                userId: req.user.id,
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                amount: 29,
                currency: "INR",
                plan: "premium_lifetime"
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

export const getTotalPayments = async (req, res) => {
    try {
        const totalPayments = await Payment.countDocuments()

        const totalAmountResult = await Payment.aggregate([
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ])

        const totalAmount = totalAmountResult[0]?.totalAmount || 0

        const paymentDetails = await Payment.find()
            .populate('userId', 'name email')
            .select('amount currency plan createdAt')
            .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            totalPayments,
            totalAmount,
            currency: "INR",
            paymentDetails
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get total payments",
            error: error.message
        })
    }
}