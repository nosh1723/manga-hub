'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import FormLogin from './form'
import Loading from '@/components/layout/loading'
import useHomeStore from '@/stores/home.store'
import useAuthStore from '@/stores/auth.store'

type Props = {
}

const LoginPage = (props: Props) => {
  const { isLoading, setIsLoading, reset } = useHomeStore()

  useEffect(() => {
    return () => reset()
  }, [])

  if (isLoading) {
    return <Loading isAuth/>
  }

  return (
    <AnimatePresence>
      <motion.div
        key={'login'}
        initial={{
          x: 0,
          y: 0,
          scale: 1.5,
          rotate: 0,
        }}
        animate={{
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
        }}
        transition={{ duration: .2, type: 'spring', damping: 11 }}
        className='w-full md:w-3/5 xl:w-2/5 sm:max-w-[550px] sm:min-w-[400px] px-5 rounded-t-lg'>
        <div className='top-0 left-0 w-full h-2 rounded-t-lg bg-[--purple-cus-300]'></div>

        <div className='px-6 py-4 sm:px-10 sm:py-7 bg-[--gray-cus-800] '>
          <h2 className='text-center text-xl font-medium mb-8'>Sign in to your account</h2>

          <FormLogin setIsChangeAnimation={setIsLoading} />
        </div>

        <div className='bottom-0 left-0 w-full h-10 bg-[--gray-cus-600] flex justify-center items-center gap-2 font-medium'>
          <span className='text-[--gray-cus-300]'>New user?</span>
          <Link href='/register' className='text-[--purple-cus-300] hover:opacity-90'>Register</Link>
        </div>
      </motion.div>
    </AnimatePresence>
  )

}

export default LoginPage