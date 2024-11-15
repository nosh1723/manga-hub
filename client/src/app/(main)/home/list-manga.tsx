'use client'

import Card from '@/components/common/card'
import Loading from '@/components/common/loading-mangas'
import { MangaLatestResult } from '@/models/manga'
import useHomeStore from '@/stores/home.store'
import useMangaStore from '@/stores/manga.store'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { motion } from 'framer-motion'

type Props = {}

const ListManga = (props: Props) => {
  const { getListLatestManga, listLatestManga, isLoading } = useMangaStore()
  const { setIsLoading, setPath } = useHomeStore()
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  let delay = 0

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += (206 * 5)
      updateArrows();
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= (206 * 5)
      updateArrows();
    }
  };

  const updateArrows = () => {
    const element = scrollRef.current;
    if (element) {
      setShowLeftArrow(element.scrollLeft > 50);
      setShowRightArrow(element.scrollWidth > element.scrollLeft + element.clientWidth);
    }
  };

  useEffect(() => {
    if(!listLatestManga) {
      getListLatestManga()
    }
  }, [])

  return (
    <>
      <div className='flex justify-between items-center mb-6 md:mb-8'>
        <motion.h2
          initial={{ y: -40 }}
          animate={{ y: 0 }}
          transition={{ delay: .4 }}
          className='text-lg font-medium'>Latest Updates</motion.h2>
        <motion.div
          initial={{ y: -40 }}
          animate={{ y: 0 }}
          transition={{ delay: .6 }}
          className='flex gap-1 items-center cursor-pointer hover:underline'>
          <Link href={'/all-manga/latest-updates'}>View All</Link>
          <FaChevronRight size={12} />
        </motion.div>
      </div>
      <div className='relative '>
        <div ref={scrollRef} onScroll={updateArrows} className='scroll-smooth snap-x snap-mandatory overflow-x-auto flex w-full snap select-none hide-scrollbar gap-4'>
          {isLoading ? <Loading /> : listLatestManga && listLatestManga.map((manga: MangaLatestResult, index: number) => {
            delay = delay + 0.1
            return (
              <Card key={index + manga.id}
                href={'/manga/' + manga.id}
                id={manga.id}
                title={manga.title.vi ? manga.title.vi : manga.title.en}
                chapter={manga.lastChapter}
                time={manga.updatedAt}
                src={manga.coversUrl}
                delay={delay}
                onClick={() => {
                  setIsLoading(true)
                  setPath('/manga/' + manga.id)
                }}
              />
            )
          })}
        </div>
        {showLeftArrow &&
          <button onClick={handleScrollLeft} className='absolute top-0 left-0 z-50 h-full flex items-center fine-transition opacity-80 hover:opacity-100 bg-gradient-to-r from-black'>
            <span className='inline-block p-2 bg-gray-400 rounded-full'>
              <ChevronLeftIcon />
            </span>
          </button>}
        {showRightArrow &&
          <button onClick={handleScrollRight} className='absolute top-0 right-0 z-50 h-full flex items-center fine-transition opacity-80 hover:opacity-100 bg-gradient-to-l from-black'>
            <span className='inline-block p-2 bg-gray-400 rounded-full'>
              <ChevronRightIcon />
            </span>
          </button>}
      </div>
    </>
  )
}

export default ListManga