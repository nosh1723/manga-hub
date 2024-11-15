'use client'

import { updatedTime } from '@/lib/utils'
import useHomeStore from '@/stores/home.store'
import useMangaStore from '@/stores/manga.store'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MangaLatestResult } from '@/models/manga'
import Loading from '@/components/common/loading-mangas'

type Props = {
    pathname: string,
}

const ListManga = ({ pathname }: Props) => {
    const { setIsLoading, setPath } = useHomeStore()
    const {
        reset,
        getListLatestManga,
        listLatestManga,
        mangaByTitle,
        mangaByTag,
        getMangaByTitle,
        isDataLoading
    } = useMangaStore()

    const [data, setData] = useState<Array<MangaLatestResult> | null>(mangaByTitle || listLatestManga)

    let delay = 0

    useEffect(() => {
        if (!listLatestManga && pathname === 'latest-updates') {
            getListLatestManga().then(data => setData(data))
        }
        if (!mangaByTitle && pathname !== 'latest-updates') {
            getMangaByTitle(pathname).then(data => {
                setData(data)
            })
        }
        return () => reset()
    }, [pathname])

    useEffect(() => {
        if (mangaByTag) setData(mangaByTag)
    }, [mangaByTag])

    return (
        <div className="flex-[4]">
            <div className='flex justify-around flex-wrap'>
                {isDataLoading ? <Loading /> :
                    (data && data?.map((manga) => {
                        delay = delay + 0.03
                        return (
                            <motion.div
                                key={manga.id}
                                whileHover={{ y: -5 }}
                                onClick={() => {
                                    setIsLoading(true)
                                    setPath('/manga/' + manga.id)
                                }}
                            >
                                <motion.div
                                    initial={{ x: -20, y: -30 }}
                                    animate={{ x: 0, y: 0 }}
                                    transition={{ delay }}
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
                    }))
                }

            </div>
        </div>
    )
}

export default ListManga