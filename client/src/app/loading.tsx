'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Loading = ({path}: {path?: string}) => {
    const route = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const time = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return () => clearTimeout(time)
    }, [])

    if(!isLoading) path ? route.push(path) : route.push('/')
    return (
        <div className='absolute top-0 left-0 z-50 bg-black w-full h-screen flex items-center'>
            <Image
                src={'/image/nyan-cat.gif'}
                width={1000}
                height={800}
                alt='loading gif'
            />
        </div>
    )
}

export default Loading