
import { Button } from '@/components/ui/button'
import useChapterStore from '@/stores/chapter.store'
import { ArrowLeftIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import SpringModal from './modal'

type Props = {
}

const Toolbar = (props: Props) => {
    const {
        chapter,
    } = useChapterStore()

    const { id } = useParams()

    const currentChapterIndex = chapter?.manga?.chapter?.findIndex(i => i.id === id)

    const [openToolBar, setOpenToolBar] = useState(true)
    const [hasRendered, setHasRendered] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setHasRendered(true);
    }, []);

    return (
        <>
            {openToolBar ? <Tool currentChapterIndex={currentChapterIndex} setIsOpen={setIsOpen} setOpenToolBar={setOpenToolBar} /> :
                <motion.div
                    key={'close-tool-bar'}
                    initial={hasRendered ? {
                        x: 400,
                        scale: 1,
                        rotate: 0
                    } : false}
                    animate={hasRendered ? {
                        x: 0,
                        scale: 1,
                        rotate: 0
                    } : {}}
                    transition={{ duration: .5, type: "spring" }}
                    className='fixed z-50 bottom-0 md:bottom-4 -left-[1px] '
                >
                    <div className='w-max flex items-center h-10 justify-between tooltip overflow-hidden shadow-lg'>
                        <Button onClick={() => setOpenToolBar(true)} variant={'purple'} className='p-0 rounded-l-none rounded-r-md w-[40px] h-full'><ChevronRightIcon width={24} /></Button>
                    </div>
                </motion.div>
            }

            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} chapters={chapter?.manga.chapter!} currentChapterIndex={currentChapterIndex} />
        </>
    )
}

export default Toolbar

type PropsTool = {
    currentChapterIndex: number | undefined,
    setOpenToolBar: (open: boolean) => void,
    setIsOpen: (open: boolean) => void
}

const Tool = ({ currentChapterIndex, setOpenToolBar, setIsOpen }: PropsTool) => {
    const {
        chapter,
        handleNext,
        handlePrev
    } = useChapterStore()

    const canPrev = currentChapterIndex as number > 0
    const canNext = currentChapterIndex as number >= 0 && currentChapterIndex as number < chapter?.manga.chapter.length! - 1


    const handleScrollToTop = () => {
        window.scrollTo({ top: 195, behavior: 'smooth' });
    };

    return (<motion.div
        key={'tool-bar'}
        initial={{
            x: -500,
            scale: 1,
            rotate: 0
        }}
        animate={{
            x: 0,
            scale: 1,
            rotate: 0
        }}
        transition={{ duration: .5, type: "spring" }}
        className='fixed z-50 bottom-0 md:bottom-4 left-0 md:left-7 w-full md:w-max flex items-center h-10 justify-between tooltip overflow-hidden shadow-lg'>
        <Button onClick={() => setOpenToolBar(false)} className='bg-gray-500 hover:bg-slate-600 rounded-none md:rounded-l-md md:rounded-r-none md:w-[60px] h-full'><ArrowLeftIcon /></Button>
        <div className='h-10 px-4 py-1 flex items-center gap-3 bg-slate-300 text-black'>
            <Button
                disabled={!canPrev}
                className='px-2 h-[28px] bg-gray-200'
                onClick={() => handlePrev(chapter?.manga.chapter!, currentChapterIndex as number, canPrev)}
            >
                <ChevronLeftIcon />
            </Button>
            <div
                onClick={() => setIsOpen(true)}
                className='w-52 h-[28px] text-sm bg-gray-200 rounded-md flex justify-center items-center cursor-pointer'
            >
                <span className='absolute z-20'>Chap {chapter?.getChapter?.attributes?.chapter}</span>
            </div>
            <Button
                disabled={!canNext}
                className='px-2 h-[28px] bg-gray-200'
                onClick={() => handleNext(chapter?.manga.chapter!, currentChapterIndex as number, canNext)}
            >
                <ChevronRightIcon />
            </Button>
        </div>
        <Button onClick={handleScrollToTop} variant={'purple'} className='rounded-none rounded-l-none md:rounded-r-md md:w-[60px] h-full'><ArrowUpIcon /></Button>
    </motion.div>)
}