'use client'

import { LayoutProps } from '@/models'
import React, { useEffect } from 'react'
import Link from 'next/link'
import useAuthStore from '@/stores/auth.store'
import { toast } from 'sonner'

type Props = {}

const AuthLayout = ({ children }: LayoutProps) => {
  const { toast: isToast } = useAuthStore()

  useEffect(() => {
    if(isToast) toast.success(isToast)
  }, [isToast])
  return (
    <div className='relative w-screen h-screen pt-36 sm:pt-0 flex flex-col sm:justify-center '>
      <Link href={'/'} className='text-center text-[32px] font-bold hover:underline'>MangaHub</Link>
      <div className='mt-5 flex justify-center'>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout