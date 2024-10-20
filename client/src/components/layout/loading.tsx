'use client'

import useHomeStore from '@/stores/home.store'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
    isAuth?: boolean
}

const Loading = ({isAuth}: Props) => {
    if(isAuth) return <LoadingAuth />
    return <LoadingMain />
}

export default Loading

const LoadingAuth = () => {
    const { path } = useHomeStore()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!isLoading) route.push(path)
    }, [isLoading])

    const route = useRouter()
    useEffect(() => {
        const time = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return () => {
            clearTimeout(time)
        }
    }, [])
    return (
        <div className='absolute top-0 left-0 z-50 bg-black w-full h-screen flex items-center'>
            <Image
                src={'/image/nyan-cat.gif'}
                width={1000}
                height={800}
                alt='loading gif'
                unoptimized
            />
        </div>
    )
}

const LoadingMain = () => {
    const { setIsLoading } = useHomeStore()
    useEffect(() => {
        const time = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return () => {
            clearTimeout(time)
        }
    }, [])
    return (
        <div className='absolute top-0 left-0 z-50 bg-black w-full h-screen flex items-center'>
            <Image
                src={'/image/nyan-cat.gif'}
                width={1000}
                height={800}
                alt='loading gif'
                unoptimized
            />
        </div>
    )
}