import React from 'react'
import {useAuthStore} from "../store/auth.store.js"
import { Navigate } from 'react-router-dom'


const RedirectRoute = ({children}) => {
    const {user,loading,getMe}=useAuthStore()
    if(loading) return <p>..loading</p>
    if(!user){
        return children
    }
    return <Navigate to="/"/>
}

export default RedirectRoute