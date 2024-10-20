'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from '@/components/ui/checkbox'
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
import useHomeStore from "@/stores/home.store"
import { LoginEmailBody, LoginUsernameBody } from '@/validation/auth'
import { zodResolver } from "@hookform/resolvers/zod"
import { EnvelopeClosedIcon, ReloadIcon } from "@radix-ui/react-icons"
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { FaGoogle, FaRegUser } from "react-icons/fa"
import { z } from "zod"

type Props = {
  setIsChangeAnimation: (isChangeAnimation: boolean) => void
}

const FormLogin = ({setIsChangeAnimation}: Props) => {
  const { isChangeLogin } = useAuthStore()

  return (
    <>
      {isChangeLogin ? <FormEmail setIsChangeAnimation={setIsChangeAnimation}/> : <FormUsername setIsChangeAnimation={setIsChangeAnimation}/>}
    </>

  )
}

export default FormLogin

const FormUsername = ({setIsChangeAnimation}: Props) => {
  const { setChangeLogin, login, error, isLoading, initUsername } = useAuthStore()
  const { setPath } = useHomeStore()

  const form = useForm<z.infer<typeof LoginUsernameBody>>({
    resolver: zodResolver(LoginUsernameBody),
    defaultValues: initUsername,
  })
  
  async function onSubmit(values: z.infer<typeof LoginUsernameBody>) {
    const res = await login(values)
    
    if (localStorage.getItem('token') && res) {
      setIsChangeAnimation(true)
      setPath('/')
    }
  }

  useEffect(() => {
    form.setError(error?.name, {
      type: 'server',
      message: error?.message
    });
  }, [error])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={'username'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='!mt-5'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="" type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between !mt-3'>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Link href={'/forgot-password'} className='text-[--purple-cus-300] font-medium text-sm hover:opacity-90'>Forgot Password?</Link>
        </div>
        <Button variant="purple" type="submit" disabled={isLoading}>
          {isLoading ? <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </> : 'Sign In'}
        </Button>

        <p className="flex justify-center text-sm !mt-5">Or Continue With</p>
        <div className="!mt-5 flex gap-2">
          <Button variant="gray" className="bg-[#F7EFE5] gap-2 rounded-sm">
            <FaGoogle className="mt-[1px]" /> Sign up with Google
          </Button>
          <Button
            variant="gray"
            className="bg-[#F7EFE5] gap-2 rounded-sm"
            type="button"
            onClick={() => setChangeLogin(true)}
          >
            <EnvelopeClosedIcon className="mt-[1px]" /> Sign up with Email
          </Button>
        </div>
      </form>
    </Form>
  )
}

const FormEmail = ({setIsChangeAnimation}: Props) => {
  const { setChangeLogin, login, error, isLoading, initEmail } = useAuthStore()
  const { setPath } = useHomeStore()

  const form = useForm<z.infer<typeof LoginEmailBody>>({
    resolver: zodResolver(LoginEmailBody),
    defaultValues: initEmail,
  })

  async function onSubmit(values: z.infer<typeof LoginEmailBody>) {
    const res = await login(values)
    if (localStorage.getItem('token') && res) {
      setIsChangeAnimation(true)
      setPath('/')
    }
  }

  useEffect(() => {
    form.setError(error?.name, {
      type: 'server',
      message: error?.message
    });
  }, [error])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={'email'}
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='!mt-5'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="" type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between !mt-3'>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Link href={'/forgot-password'} className='text-[--purple-cus-300] font-medium text-sm hover:opacity-90'>Forgot Password?</Link>
        </div>
        <Button variant="purple" type="submit" disabled={isLoading}>
          {isLoading ? <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </> : 'Sign In'}
        </Button>

        <p className="flex justify-center text-sm !mt-5">Or Continue With</p>
        <div className="!mt-5 flex gap-2">
          <Button variant="gray" className="bg-[#F7EFE5] gap-2 rounded-sm">
            <FaGoogle className="mt-[1px]" /> Sign up with Google
          </Button>
          <Button
            variant="gray"
            className="bg-[#F7EFE5] gap-2 rounded-sm"
            type="button"
            onClick={() => setChangeLogin(false)}
          >
            <FaRegUser className="mt-[1px]" /> Sign up with Username
          </Button>
        </div>
      </form>
    </Form>
  )
}
