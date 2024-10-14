import Link from 'next/link'
import FormLogin from './form'

type Props = {}

const LoginPage = async(props: Props) => {
  return (
    <div className='w-96 sm:w-2/5 sm:max-w-[600px] sm:min-w-[400px] px-5 rounded-t-lg'>
      <div className='top-0 left-0 w-full h-2 rounded-t-lg bg-[--purple-cus-300]'></div>

      <div className='px-6 py-4 sm:px-10 sm:py-7 bg-[--gray-cus-800] '>
        <h2 className='text-center text-xl font-medium mb-8'>Sign in to your account</h2>

        <FormLogin/>
      </div>

      <div className='bottom-0 left-0 w-full h-10 bg-[--gray-cus-600] flex justify-center items-center gap-2 font-medium'>
        <span className='text-[--gray-cus-300]'>New user?</span>
        <Link href='/register' className='text-[--purple-cus-300] hover:opacity-90'>Register</Link>
      </div>
    </div>
  )
}

export default LoginPage