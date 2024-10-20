import React from 'react'
import Link from 'next/link'
import FormForgotPassword from './form'

type Props = {}

const ForgotPassword = (props: Props) => {
  return (
      <div className='w-96 sm:w-2/5 sm:max-w-[550px] sm:min-w-[400px] px-5 rounded-t-lg'>
        <div className='top-0 left-0 w-full h-2 rounded-t-lg bg-[--purple-cus-300]'></div>

        <FormForgotPassword />

      </div>
  )
}

export default ForgotPassword