import axios from "axios"
const axiosInstance=axios.create({
    baseURL:"https://jobwallah-backend-yo6q.onrender.com",
    withCredentials:true
})
export default axiosInstance