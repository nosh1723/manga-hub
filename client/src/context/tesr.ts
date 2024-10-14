'use server'

import { cookies } from "next/headers";


export const test = async () => {
    const cookie = cookies()
    return cookie.get('token')
}
  