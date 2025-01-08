'use client'

import Loading from '@/components/common/loading-mangas'
import { Button } from '@/components/ui/button'
import { updatedTime } from '@/lib/utils'
import { MangaLatestResult } from '@/models/manga'
import useHomeStore from '@/stores/home.store'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Props = {
    page: number,
    isLoading?: boolean,
    isHideBtnLoadMore?: boolean,
    data: Array<MangaLatestResult> | null,
    handleLoadMore: () => void
}

const ListManga = ({page, isHideBtnLoadMore = false, isLoading, data, handleLoadMore}: Props) => {
    const { setIsLoading, setPath } = useHomeStore()

    let delay = 0

    return (
        <div className='h-full flex justify-around md:justify-center lg:justify-around gap-6 lg:gap-0 flex-wrap'>
            {isLoading && page === 1 ? <div className='md:min-h-[calc(100%-6rem)] flex items-center'><Loading /></div> :
                (data && data?.map((manga) => {
                    delay = delay + 0.03
                    return (
                        <motion.div
                            key={manga?.id}
                            whileHover={{ y: -5 }}
                            onClick={() => {
                                setIsLoading(true)
                                setPath('/manga/' + manga?.id)
                            }}
                        >
                            <motion.div
                                initial={{ x: -20, y: page !== 1 ? 0 : -30, opacity: 0, scale: .4 }}
                                animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                transition={{ delay }}
                                className='w-[140px] md:w-[190px] cursor-pointer'
                            >
                                <div className='relative flex-none w-[140px] md:w-[190px] h-[220px] md:h-[280px]'>
                                    <Image
                                        src={manga?.coversUrl}
                                        fill
                                        alt='bg manga'
                                        placeholder="blur"
                                        blurDataURL='/image/bocchi.png'
                                        className='rounded-lg'
                                    />
                                </div>
                                <div className='py-2 w-full'>
                                    <h3 className='font-medium line-clamp-2'>{manga?.title?.en}</h3>
                                    <p className='text-sm'>{manga?.lastChapter ? 'C. ' + manga?.lastChapter : 'Oneshot' } - {updatedTime(manga?.updatedAt)}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }))
            }
            {page !== 1 && isLoading && <Loading className='mt-10' />}
            {!isHideBtnLoadMore && <Button className='md:ml-2 lg:ml-0 mt-10 w-full' onClick={handleLoadMore}>Load More</Button>} 
        </div>
    )
}

export default ListManga