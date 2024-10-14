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
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type Props = {}

const formSchema = z.object({
  username: z.string({ required_error: "Must not be empty" }).min(6, {
    message: "Username must be at least 6 characters.",
  }),
  email: z.string({ required_error: "Must not be empty" }).email(),
  password: z.string({ required_error: "Must not be empty" }).min(6).max(100),
  confirmPassword: z.string({ required_error: "Must not be empty" }).min(6).max(100)
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"],
  });

const FormRegister = (props: Props) => {
  const router = useRouter()
  const { register, error, isLoading } = useAuthStore()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    register(values).then((data) => {
      if (data) {
        router.push('/login')
      }
    })
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
          name="username"

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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className='!mt-5'>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="" type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='!mt-5'>
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
          </> : 'Register'}
        </Button>
      </form>
    </Form>
  )
}

export default FormRegister