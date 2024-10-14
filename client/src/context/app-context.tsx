'use client'

import { LayoutProps } from "@/models"
import useAuthStore from "@/stores/auth.store"
import { useEffect } from "react"



const AppProvider = ({children}: LayoutProps) => {
    const {getAccessToken, getCurrentUser} = useAuthStore()
    useEffect(() => {   
        getAccessToken()
        getCurrentUser()
    }, [])
    
    return (
        <>
        {children}
        </>
    )
}

export default AppProvider