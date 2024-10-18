'use client'

import { Button } from '@/components/ui/button'
import { Chapter } from '@/models/manga'
import { useRouter } from 'next/navigation'

type Props = {
    listChapter: {
        data: Array<Chapter>, total: number
    }
}

const HeaderButton = ({listChapter}: Props) => {
    const router = useRouter()
    const handleStartReading = () => {
        router.push('/reading-manga/' + listChapter.data[0].id)
    }
    return (
        <div className='flex mt-3 gap-2'>
            <Button variant={'purple'} className='w-max px-5 py-[6px] text-sm h-auto'>Follow</Button>
            <Button onClick={handleStartReading} variant={'gray'} className='w-max px-5 py-[6px] text-sm h-auto bg-[#F6B17A] text-gray-900'>Start Reading</Button>
        </div>
    )
}

export default HeaderButton