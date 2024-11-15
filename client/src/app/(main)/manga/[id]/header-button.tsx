'use client'

import { Button } from '@/components/ui/button'
import { Chapter } from '@/models/manga'
import useHomeStore from '@/stores/home.store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type Props = {
    listChapter: {
        data: Array<Chapter>, total: number
    }
}

const HeaderButton = ({listChapter}: Props) => {
    const router = useRouter()
    const {reset} = useHomeStore()

    useEffect(() => {
        return () => reset()
    }, [])

    const handleStartReading = () => {
        router.push('/reading-manga/' + listChapter.data[0].id)
    }
    return (
        <div className='flex flex-col md:flex-row mt-3 gap-2'>
            <Button variant={'purple'} className='w-full md:w-max px-5 py-[6px] text-sm h-auto'>Follow</Button>
            <Button onClick={handleStartReading} variant={'gray'} className='w-full md:w-max px-5 py-[6px] text-sm h-auto bg-[#F6B17A] text-gray-900'>Start Reading</Button>
        </div>
    )
}

export default HeaderButton