'use client'
import useAuthStore from '@/stores/auth.store'
import { useEffect } from 'react'

type Props = {}

const SlideSession = (props: Props) => {
    const { refreshToken, getCurrentUser } = useAuthStore()
    useEffect(() => {
        getCurrentUser()
        const interval = setInterval(async () => {
          const accessToken = localStorage.getItem('token')
          if(accessToken){
            await refreshToken(accessToken)
          }
        }, 1000 * 60 * 30) //30m
        return () => clearInterval(interval)
      }, [])
      return null
}

export default SlideSession