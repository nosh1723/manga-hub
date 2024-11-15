import moment from 'moment'
import Image from 'next/image'
import { LegacyRef } from 'react'
import { motion } from 'framer-motion'

type Props = {
    id: string,
    src: string,
    title: string,
    chapter?: string | null,
    time?: string,
    href: string,
    ref?: LegacyRef<HTMLAnchorElement>,
    onClick?: VoidFunction,
    delay: number
}

const Card = ({ id, src, title, chapter, time, delay, onClick }: Props) => {
    const timeUpdated = moment(time).fromNow()

    return (
        <motion.div
            key={'card manga'}
            initial={{y: -40, x: -20, opacity: .5}}
            animate={{y: 0, x: 0, opacity: 1}}
            transition={{delay: delay}}
            onClick={onClick}
            className='relative cursor-pointer overflow-hidden flex-none snap-start snap-always w-[135px] h-[200px] lg:w-[190px] lg:h-[270px] rounded-lg'
        >
            <Image
                src={src}
                fill
                alt='card'
                placeholder="blur"
                blurDataURL='/image/bocchi.png'
                className='absolute top-0 left-0 z-10 rounded-lg'
            />

            <div className='absolute w-full h-full top-0 left-0 z-20 bg-card_main'></div>
            <div className='absolute z-40 w-full left-0 bottom-0 px-1 py-1 lg:px-3 lg:py-3 md:px-2 md:py-2'>
                <span className='line-clamp-2 text-sm md:text-base md:line-clamp-1 text-left'>{title}</span>
                <div className='flex justify-between items-center text-xs lg:text-sm lg:mt-2'>
                    <span>Ch. {chapter || "none"}</span>
                    <span>{timeUpdated || "..."}</span>
                </div>
            </div>
        </motion.div>
    )
}

export default Card