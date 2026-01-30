import Razorpay from "razorpay"
import crypto from "crypto"
import User from "../models/user.model.js"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export const createOrder = async (req, res) => {
    try {
        const { amount } = req.body

        if (!amount || amount < 99) {
            return res.status(400).json({
                success: false,
                message: "Minimum amount is ₹99"
            })
        }

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                userId: req.user.id,
                plan: "premium_lifetime",
                customAmount: amount
            }
        }

        const order = await razorpay.orders.create(options)

        await User.findByIdAndUpdate(req.user.id, {
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
            message: "Failed to create order"
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