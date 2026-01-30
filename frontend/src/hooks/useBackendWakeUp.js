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
                    console.log('Backend is ready:', data)
                    setIsBackendReady(true)
                    setIsChecking(false)
                    clearInterval(interval)
                    clearTimeout(timeout)
                }
            } catch (error) {
                console.log(`Backend ping attempt ${attempts} failed:`, error.message)
               
            }
        }


        pingBackend()

     
        interval = setInterval(pingBackend, 3000)

        
        timeout = setTimeout(() => {
            console.log('Backend wake-up timeout reached, proceeding anyway')
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