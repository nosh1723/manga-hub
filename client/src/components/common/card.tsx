import Image from 'next/image'
import Link from 'next/link'
import { LegacyRef } from 'react'

type Props = {
    src: string,
    title: string,
    chapter?: number,
    time?: string,
    href: string,
    ref?: LegacyRef<HTMLAnchorElement>
}

const Card = ({src, title, chapter, time, href, ref}: Props) => {
  return (
    <Link ref={ref} href={href} className='block overflow-hidden flex-none snap-start snap-always relative w-[190px] h-[280px] bg-slate-200 rounded-lg'>
        <Image
            src={src}
            width={190}
            height={270}
            alt='card'
            className='absolute w-full h-full top-0 left-0 z-10 rounded-lg'
        />
        <div className='absolute w-full h-full top-0 left-0 z-20 bg-card'></div>
        <div className='absolute z-50 w-full left-0 bottom-0 px-4 py-3'>
            <span className='line-clamp-1'>{title}</span>
            <div className='flex justify-between items-center text-sm mt-2'>
                <span>Ch. {chapter || "none"}</span>
                <span>{time || "..."}</span>
            </div>
        </div>
    </Link>
  )
}

export default Card