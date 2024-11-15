'use client'

import { LayoutProps } from '@/models'
import React, { useEffect } from 'react'
import Link from 'next/link'
import useAuthStore from '@/stores/auth.store'
import { toast } from 'sonner'
import BGAuth from '@/components/common/bg-auth'
import useWindowSize from '@/hooks/use-window-size'

type Props = {}

const AuthLayout = ({ children }: LayoutProps) => {
  const { toast: isToast, setToast } = useAuthStore()
  const {width} = useWindowSize()

  useEffect(() => {
    if (isToast) {
      toast.success(isToast)
      setToast('')
    }
  }, [isToast])
  return (
    <div>
      <div className='relative w-screen h-screen sm:pt-0 flex flex-col justify-center '>
        {width! > 1024 ? <div className='absolute -z-[99999] w-full h-full'><BGAuth /></div> : <></>}
        <div className='text-center text-[32px] font-bold '><Link href={'/'} className='hover:underline'>MangaHub</Link></div>
        <div className='mt-5 flex justify-center'>
          {children}
        </div>
      </div>
    </div>


  )
}

export default AuthLayout