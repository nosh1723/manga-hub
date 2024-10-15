'use client'

import { Button } from '@/components/ui/button'
import { updatedTime } from '@/lib/utils'
import useMangaStore from '@/stores/manga.store'
import { ClockIcon } from '@radix-ui/react-icons'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

type Props = {}

const DetailsManga = (props: Props) => {
    const { getManga, manga } = useMangaStore()
    const {id} = useParams()

    useEffect(() => {
        getManga(id as string)
    }, [])
    return (
        <div className='container px-40 mx-auto mt-14 flex flex-col items-center mb-20'>
            <div className='bg-gray-200 w-[1200px] rounded-t-lg'>
                <div className='relative w-full min-h-[730px]'>
                    <div className='absolute w-full h-[563px] z-10 bg-banner__main top-0 left-0'></div>
                    <Image
                        src='/image/sakamoto.jpg'
                        width={1200}
                        height={563}
                        alt='bg manga'
                        className='w-full rounded-t-lg absolute z-0'
                        objectFit='cover'
                    />
                    <div className='absolute z-20 left-10 bottom-5 flex'>
                        <Image
                            src={manga?.coverUrl!}
                            width={190}
                            height={270}
                            alt='bg card manga'
                            className='rounded-lg '
                            blurDataURL='/image/bocchi.png'
                        />
                        <div className='ml-4'>
                            <div className='mt-20'>
                                <span className='text-sm'>{manga?.author.data.attributes.name}</span>
                                <h2 className='font-bold text-xl line-clamp-1 pr-10'>{manga?.attributes.title.en}</h2>
                            </div>
                            <div className='mt-3'>
                                <div className='flex items-center gap-1 text-black font-medium'>
                                    <ClockIcon width={17} height={17} className='-mt-[2px]' />
                                    <span>{updatedTime(manga?.attributes.updatedAt!)}</span>
                                </div>
                                <div className='w-[900px] flex flex-wrap items-center gap-2 mt-2'>
                                    {manga?.attributes.tags.map((tag, index) => (<div key={index} className='flex-none px-3 bg-[--gray-cus-100] rounded-2xl text-black text-sm'>{tag.attributes.name.en}</div>))}

                                </div>
                                <div className='flex mt-3 gap-2'>
                                    <Button variant={'purple'} className='w-max px-5 py-[6px] text-sm h-auto'>Follow</Button>
                                    <Button variant={'gray'} className='w-max px-5 py-[6px] text-sm h-auto'>Start Reading</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[1200px] bg-white rounded-b-lg px-5 py-7 flex gap-8 text-black'>
                <div className='flex-[3]'>
                    <div className='p-4 bg-gray-200 rounded-md text-[--gray-cus-400] text-sm'>
                        <p className=''>{manga?.attributes.description.en} </p>
                    </div>
                    <div className='flex flex-col gap-1 mt-10'>
                        {manga?.chapter.map((chapter, index) => {
                            return <Link key={index} href={'/reading-manga'} className={`px-4 py-2 ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"} flex items-center gap-3 hover:opacity-70`}>
                            <h3 className='uppercase text-md font-bold'>chap {chapter.attributes.chapter}</h3>
                            <div className='flex flex-col'>
                                <h4 className='font-medium'>{chapter.attributes.title}</h4>
                                <div className='text-sm text-[--gray-cus-400]'><span>{updatedTime(chapter.attributes.updatedAt)}</span> {" - "} <span>2.4k reads</span></div>
                            </div> 
                        </Link>
                        })}
                    </div>
                </div>
                <div className='flex-[1]'>
                    <h2 className='text-gray-600 uppercase font-medium'>Same author</h2>
                    <div className='flex flex-col mt-3'>
                        <div className='flex gap-2'>
                            <Image 
                                src={'/image/sakamotox.jpg'}
                                width={40}
                                height={50}
                                alt='bg manga same author'
                                className='rounded-md'
                            />
                            <div className='text-gray-600 text-sm font-medium'>
                                <h4>Blue lock</h4>
                                <div>
                                    <span>C. 200</span> {" - "}
                                    <span>10 months ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsManga