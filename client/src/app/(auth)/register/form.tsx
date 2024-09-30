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
import { zodResolver } from "@hookform/resolvers/zod"
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useForm } from "react-hook-form"
import { z } from "zod"

type Props = {}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string()
})

const FormRegister = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
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
                <Input placeholder="" {...field}/>
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

        <Link href={'/login'} className='!mt-2 flex items-center gap-1 text-[--purple-cus-300] font-medium text-sm hover:opacity-90'><DoubleArrowLeftIcon width={14} height={14}/> Back to login</Link>
        <Button variant="purple" type="submit">Register</Button>
      </form>
    </Form>
  )
}

export default FormRegister