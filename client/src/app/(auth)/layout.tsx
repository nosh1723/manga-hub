import { LayoutProps } from '@/models'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

type Props = {}

const AuthLayout = ({children}: LayoutProps) => {
  return (
    <div className='relative w-screen h-screen pt-36 sm:pt-0 flex flex-col sm:justify-center '>
      <Image 
        src="/image/auth.png"
        width={400}
        height={400}
        alt="Bocchi!?"
        className='absolute z-[-99] bottom-0 hidden sm:block'
      />
      <Link href={'/'} className='text-center text-[32px] font-bold hover:underline'>MangaHub</Link>
      <div className='mt-10 flex justify-center'>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout