'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Props = {}

const SlideHome = (props: Props) => {
    return (
        <motion.div
            key={'slide'}
            initial={{y: -30}}
            animate={{
                y: 0
            }}
            transition={{delay: .3}}
            className='container flex justify-center mt-10 md:mt-14'>
                <div className='relative flex-none w-[364px] md:w-[calc(100%-2rem)] h-[261px] md:h-[180px] lg:h-[280px] 2xl:h-[330px] rounded-md border-2 border-gray-200'>
                    <Image
                        src={'/image/bg_bannerpng_mobile.png'}
                        fill
                        alt='bg-banner'
                        priority
                        className='object-top object-contain md:object-cover rounded-sm'
                    />
                </div>
        </motion.div>
    )
}

export default SlideHome