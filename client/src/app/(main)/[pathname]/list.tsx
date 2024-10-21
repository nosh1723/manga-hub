'use client'

import { updatedTime } from '@/lib/utils'
import useHomeStore from '@/stores/home.store'
import useMangaStore from '@/stores/manga.store'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

type Props = {}

const ListManga = (props: Props) => {
    const { mangaByTag, reset, listLatestManga, getListLatestManga } = useMangaStore()
    const { setIsLoading, setPath } = useHomeStore()
    const data = mangaByTag || listLatestManga

    let delay = 0

    useEffect(() => {
        if(!listLatestManga) {
            getListLatestManga()
        }
        return () => reset()
    }, [])

    return (
        <div className="flex-[4]">
            <div className='flex justify-around flex-wrap'>
                {data && data?.map((manga) => {
                    delay = delay + 0.03
                    return (
                        <motion.div
                            key={manga.id}
                            whileHover={{y: -5}}
                            onClick={() => {
                                setIsLoading(true)
                                setPath('/manga/' + manga.id)
                            }}
                        >
                            <motion.div
                                initial={{x: -20, y: -30}}
                                animate={{x: 0, y: 0}}
                                transition={{delay}}
                                className='w-[190px] cursor-pointer'
                            >
                                <Image
                                    src={manga.coversUrl}
                                    width={190}
                                    height={280}
                                    alt='bg manga'
                                    placeholder="blur"
                                    blurDataURL='/image/bocchi.png'
                                    className='rounded-lg'
                                />
                                <div className='py-2 w-full'>
                                    <h3 className='font-medium line-clamp-2'>{manga.title.en}</h3>
                                    <p className='text-sm'>C. {manga.lastChapter} - {updatedTime(manga.updatedAt)}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                })}

            </div>
        </div>
    )
}

export default ListManga