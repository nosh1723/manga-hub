'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import useWindowSize from '@/hooks/use-window-size'

type Props = {}

const SlideHome = (props: Props) => {
    const { width } = useWindowSize()
    return (
        <motion.div
            key={'slide'}
            initial={{y: -30}}
            animate={{
                y: 0
            }}
            transition={{delay: .3}}
            className='flex justify-center mt-10 md:mt-14'>
            <div className='container px-8 w-full'>
                <div className='rounded-md border-2 border-gray-200'>
                    <Image
                        src={width! < 640 ? '/image/bg_bannerpng_mobile.png' : '/image/bg_bannerpng.png'}
                        width={1400}
                        height={330}
                        alt='bg-banner'
                        priority
                        className='w-full rounded-sm'
                    />
                </div>
            </div>
        </motion.div>
    )
}

export default SlideHome