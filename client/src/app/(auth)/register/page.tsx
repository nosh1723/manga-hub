import Link from 'next/link'
import React from 'react'
import FormRegister from './form'

type Props = {}

const RegisterPage = (props: Props) => {
  return (
    <div className='w-96 sm:w-2/5 sm:max-w-[600px] sm:min-w-[400px] px-5 rounded-t-lg'>
      <div className='top-0 left-0 w-full h-2 rounded-t-lg bg-[--purple-cus-300]'></div>

      <div className='px-6 py-4 sm:px-10 sm:py-7 bg-[--gray-cus-800] rounded-b-md'>
        <h2 className='text-center text-xl font-medium mb-8'>Sign in to your account</h2>

        <FormRegister/>
      </div>

    </div>
  )
}

export default RegisterPage