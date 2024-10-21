'use client'

import { LayoutProps } from '@/models'
import React, { useEffect } from 'react'
import Link from 'next/link'
import useAuthStore from '@/stores/auth.store'
import { toast } from 'sonner'

type Props = {}

const AuthLayout = ({ children }: LayoutProps) => {
  const { toast: isToast, setToast } = useAuthStore()

  useEffect(() => {
    if(isToast) {
      toast.success(isToast)
      setToast('')
    }
  }, [isToast])
  return (
    <div className='relative w-screen h-screen pt-36 sm:pt-0 flex flex-col sm:justify-center '>
      <div className='text-center text-[32px] font-bold '><Link href={'/'} className='hover:underline'>MangaHub</Link></div>
      <div className='mt-5 flex justify-center'>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout