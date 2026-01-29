import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js"
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "User already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        await generateTokenAndSetCookie(user._id, res)
        return res.status(201).json({
            message: "User has been created",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    }
    catch (error) {
        console.log("Error in signup auth backend")
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Sign up first" })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).json({ message: "Wrong credentials" })
        }
        await generateTokenAndSetCookie(user._id, res)
        return res.status(200).json({
            message: "User logged in",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    }
    catch (error) {
        console.log("Error in login auth backend")
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({
            message: "User logged out",
        })
    }
    catch (error) {
        console.log("Error in logout auth backend")
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(401).json({ message: "Unauthorised" })
        }
        return res.status(200).json({
            message: "User found",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    }
    catch (error) {
        console.log("Error in getMe auth backend")
        return res.status(500).json({ message: "Internal server error" })
    }
}