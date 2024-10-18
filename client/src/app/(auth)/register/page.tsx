'use client'
import React from 'react'
import FormRegister from './form'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {}

const RegisterPage = (props: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        key={'login'}
        initial={{
          x: -100,
          y: 0,
          scale: .5,
          rotate: 0,
        }}
        animate={{
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
        }}
        transition={{ duration: .2, type: 'spring', damping: 11 }}
        className='w-96 sm:w-2/5 sm:max-w-[550px] sm:min-w-[400px] px-5 rounded-t-lg'>
        <div className='top-0 left-0 w-full h-2 rounded-t-lg bg-[--purple-cus-300]'></div>

        <div className='px-6 py-4 sm:px-10 sm:py-7 bg-[--gray-cus-800] rounded-b-md'>
          <h2 className='text-center text-xl font-medium mb-8'>Sign in to your account</h2>

          <FormRegister />
        </div>

      </motion.div>
    </AnimatePresence>
  )
}

export default RegisterPage