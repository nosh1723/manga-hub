import { LayoutProps } from '@/models'
import React from 'react'
import Link from 'next/link'

type Props = {}

const AuthLayout = ({ children }: LayoutProps) => {
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