'use client'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useAuthStore from "@/stores/auth.store"
import { zodResolver } from "@hookform/resolvers/zod"
import { DoubleArrowLeftIcon, ReloadIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type Props = {
  canNextForm: number,
  setCanNextForm: (canNextForm: number) => void,
  bottomText: string,
  setBottomText: (bottomText: string) => void,
  email: string,
  setEmail: (email: string) => void,
}

const formEmailSchema = z.object({
  email: z.string({ required_error: "Must not be empty" }).email(),
})

const formCodeSchema = z.object({
  code: z.string({ required_error: "Must not be empty" }).min(1, { message: "Must not be empty" })
})

const formPasswordSchema = z.object({
  password: z.string({ required_error: "Must not be empty" }).min(6).max(100),
  confirmPassword: z.string({ required_error: "Must not be empty" }).min(6).max(100)
}).refine((data) => data.password === data.confirmPassword, {
  message: "The passwords do not match",
  path: ["confirmPassword"],
});

const FormForgotPassword = () => {
  const [canNextForm, setCanNextForm] = useState(1)
  const [bottomText, setBottomText] = useState('Enter your email and we will send a verification code to your email')
  const [email, setEmail] = useState('Enter your email and we will send a verification code to your email')

  const props = {
    canNextForm,
    setCanNextForm,
    bottomText,
    setBottomText,
    email,
    setEmail
  }
  return canNextForm === 1 ?
    <FormEmail {...props} /> :
    canNextForm === 2 ? <FormCode {...props} /> :
      <FormPassword {...props} />
}

export default FormForgotPassword

const FormEmail = ({ setCanNextForm, bottomText, setBottomText, setEmail }: Props) => {
  const { forgotPassword, error, isLoading } = useAuthStore()
  const form = useForm<z.infer<typeof formEmailSchema>>({
    resolver: zodResolver(formEmailSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formEmailSchema>) {
    const res = await forgotPassword(values.email)
    if(res) {
      setEmail(values.email)
      setCanNextForm(2)
      setBottomText('Enter the verification code to continue')
    }
  }

  useEffect(() => {
    form.setError(error?.name, {
      type: 'server',
      message: error?.message
    });
  }, [error])
  return (
    <>
      <div className='px-6 py-4 sm:px-10 sm:py-7 bg-[--gray-cus-800] '>
        <h2 className='text-center text-xl font-medium mb-8'>Forgot Your Password?</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link href={'/login'} className='!mt-2 flex items-center gap-1 text-[--purple-cus-300] font-medium text-sm hover:opacity-90'><DoubleArrowLeftIcon width={14} height={14} /> Back to login</Link>

            <Button variant="purple" type="submit" disabled={isLoading}>
              {isLoading ? <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </> : 'Submit'}
            </Button>
          </form>
        </Form>
      </div>
      <div className='bottom-0 left-0 px-2 py-1 w-full bg-[--gray-cus-600] flex justify-center items-center gap-2 font-medium'>
        <p className='block text-[--gray-cus-300] text-center text-sm px-14'>{bottomText}</p>
      </div>
    </>
  )
}

const FormCode = ({ bottomText, setBottomText, setCanNextForm, email }: Props) => {
  const { compareCode, error, isLoading } = useAuthStore()
  const form = useForm<z.infer<typeof formCodeSchema>>({
    resolver: zodResolver(formCodeSchema),
    defaultValues: {
      code: ''
    },
  })

  async function onSubmit(values: z.infer<typeof formCodeSchema>) {
    const res = await compareCode(email, values.code)
      if(res) {
        setCanNextForm(3)
        setBottomText('Enter your new password')
      }
  }

  useEffect(() => {
    form.setError(error?.name, {
      type: 'server',
      message: error?.message
    });
  }, [error])
  return (
    <>
      <div className='px-6 py-4 sm:px-10 sm:py-7 bg-[--gray-cus-800] '>
        <h2 className='text-center text-xl font-medium mb-8'>Forgot Your Password?</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification code</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link href={'/login'} className='!mt-2 flex items-center gap-1 text-[--purple-cus-300] font-medium text-sm hover:opacity-90'><DoubleArrowLeftIcon width={14} height={14} /> Back to login</Link>

            <Button variant="purple" type="submit" disabled={isLoading}>
              {isLoading ? <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </> : 'Submit'}
            </Button>
          </form>
        </Form>
      </div>
      <div className='bottom-0 left-0 px-2 py-1 w-full bg-[--gray-cus-600] flex justify-center items-center gap-2 font-medium'>
        <p className='block text-[--gray-cus-300] text-center text-sm px-14'>{bottomText}</p>
      </div>
    </>
  )
}

const FormPassword = ({ bottomText, email }: Props) => {
  const router = useRouter()
  const { error, isLoading, updateForgotPassword } = useAuthStore()
  const form = useForm<z.infer<typeof formPasswordSchema>>({
    resolver: zodResolver(formPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
  })

  async function onSubmit(values: z.infer<typeof formPasswordSchema>) {
    const res = await updateForgotPassword(email, values.password)
    if(res) {
      router.push('/login')
    }
  }

  useEffect(() => {
    form.setError(error?.name, {
      type: 'server',
      message: error?.message
    });
  }, [error])
  return (
    <>
      <div className='px-6 py-4 sm:px-10 sm:py-7 bg-[--gray-cus-800] '>
        <h2 className='text-center text-xl font-medium mb-8'>Forgot Your Password?</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className='!mt-5'>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className='!mt-5'>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link href={'/login'} className='!mt-2 flex items-center gap-1 text-[--purple-cus-300] font-medium text-sm hover:opacity-90'><DoubleArrowLeftIcon width={14} height={14} /> Back to login</Link>

            <Button variant="purple" type="submit" disabled={isLoading}>
              {isLoading ? <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </> : 'Submit'}
            </Button>
          </form>
        </Form>
      </div>
      <div className='bottom-0 left-0 px-2 py-1 w-full bg-[--gray-cus-600] flex justify-center items-center gap-2 font-medium'>
        <p className='block text-[--gray-cus-300] text-center text-sm px-14'>{bottomText}</p>
      </div>
    </>
  )
}