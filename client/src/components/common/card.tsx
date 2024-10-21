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
            className='relative cursor-pointer overflow-hidden flex-none snap-start snap-always w-[190px] h-[270px] rounded-lg'
        >
            <Image
                src={src}
                sizes='190px'
                fill
                alt='card'
                placeholder="blur"
                blurDataURL='/image/bocchi.png'
                className='absolute top-0 left-0 z-10 rounded-lg'
            />

            <div className='absolute w-full h-full top-0 left-0 z-20 bg-card_main'></div>
            <div className='absolute z-40 w-full left-0 bottom-0 px-3 py-3'>
                <span className='line-clamp-1 text-left'>{title}</span>
                <div className='flex justify-between items-center text-sm mt-2'>
                    <span>Ch. {chapter || "none"}</span>
                    <span>{timeUpdated || "..."}</span>
                </div>
            </div>
        </motion.div>
    )
}

export default Card