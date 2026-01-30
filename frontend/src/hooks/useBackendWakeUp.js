import { useState, useEffect } from 'react'
import axiosInstance from '../utils/axios'

export const useBackendWakeUp = () => {
    const [isBackendReady, setIsBackendReady] = useState(false)
    const [isChecking, setIsChecking] = useState(true)
    const [attempts, setAttempts] = useState(0)

    useEffect(() => {
        let interval
        let timeout

        const pingBackend = async () => {
            try {
                setAttempts(prev => prev + 1)

                const response = await fetch(
                    `${axiosInstance.defaults.baseURL}/api/health`,
                    {
                        method: 'GET',
                        credentials: 'include',
                        signal: AbortSignal.timeout(10000) 
                    }
                )

                if (response.ok) {
                    const data = await response.json()
                    setIsBackendReady(true)
                    setIsChecking(false)
                    clearInterval(interval)
                    clearTimeout(timeout)
                }
            } catch (error) {
            }
        }


        pingBackend()

     
        interval = setInterval(pingBackend, 3000)

        
        timeout = setTimeout(() => {
            setIsBackendReady(true)
            setIsChecking(false)
            clearInterval(interval)
        }, 120000) 

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [])

    return { isBackendReady, isChecking, attempts }
}