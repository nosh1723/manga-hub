import useMangaStore from '@/stores/manga.store'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { LegacyRef, useEffect } from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {
    id: string,
    src: string,
    title: string,
    chapter?: string | null,
    time?: string,
    href: string,
    ref?: LegacyRef<HTMLAnchorElement>
}

const Card = ({ id, src, title, chapter, time, href, ref }: Props) => {
    const { setLazyLoad, lazyLoad } = useMangaStore()
    const timeUpdated = moment(time).fromNow()

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setLazyLoad(false)
        }, 500)

        return () => clearTimeout(timeOut)
    }, [])
    return (
        <Link ref={ref} href={href} className='relative block overflow-hidden flex-none snap-start snap-always w-[190px] h-[280px] rounded-lg'>
            {lazyLoad ? <Skeleton className="absolute w-full h-full top-0 left-0 z-10 rounded-lg" /> :
                <Image
                    src={src}
                    width={190}
                    height={270}
                    alt='card'
                    className='absolute w-full h-full top-0 left-0 z-10 rounded-lg'
                />
            }

            <div className='absolute w-full h-full top-0 left-0 z-20 bg-card_main'></div>
            <div className='absolute z-50 w-full left-0 bottom-0 px-3 py-3'>
                <span className='line-clamp-1'>{title}</span>
                <div className='flex justify-between items-center text-sm mt-2'>
                    <span>Ch. {chapter || "none"}</span>
                    <span>{timeUpdated || "..."}</span>
                </div>
            </div>
        </Link>
    )
}

export default Card