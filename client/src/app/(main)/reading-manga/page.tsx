import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, ArrowUpIcon, ChatBubbleIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const ReadingManga = (props: Props) => {
  return (
    <div className='container relative  px-40 mx-auto mt-14 flex flex-col items-center mb-20'>
      <div className='fixed z-50 bottom-4 left-7 w-max flex items-center h-10 justify-between tooltip overflow-hidden shadow-lg'>
        <Button variant={'purple'} className='rounded-l-md rounded-r-none w-[60px] h-full'><ChatBubbleIcon/></Button>
        <div className='h-10 px-4 py-1 flex items-center gap-3 bg-slate-300 text-black'>
          <Link href={''}><ChevronLeftIcon /></Link>
          <div className='w-52 h-[30px] text-sm text-white bg-gray-500 rounded-md flex justify-center items-center'>Chap 1</div>
          <Link href={''}><ChevronRightIcon /></Link>
        </div>
        <Button className='bg-gray-500 hover:bg-slate-600 rounded-l-none rounded-r-md w-[60px] h-full'><ArrowUpIcon /></Button>
      </div>
      <div className='w-full flex justify-start'>
        <Link href={'/details-manga'} className='flex items-center gap-1 hover:opacity-90'>
           <div className='text-gray-400 flex items-center gap-2'>
              <ArrowLeftIcon  width={17} height={17} className='-mt-[1px]'/>
              <span>Sakamoto Days (FULL HD)</span>
           </div> {" | "}
           <span>Chương 1: Bản Việt hóa chương 1-10 thuộc Eishun Team</span>
        </Link>
      </div>

      <div className='mt-10'>
        <Image 
          src={'/image/page1.jpg'}
          width={1200}
          height={500}
          alt='page manga'
          className=' max-w-[1200px]'
        />
      </div>
    </div>
  )
}

export default ReadingManga