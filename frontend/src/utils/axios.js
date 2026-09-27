import axios from "axios"

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === "production"
        ? "https://jobwallah-backend-yo6q.onrender.com"
        : "http://localhost:5000",
    withCredentials: true
})

export default axiosInstance