'use client'

import Card from '@/components/common/card'
import Loading from '@/components/common/loading'
import { MangaLatestResult } from '@/models/manga'
import useMangaStore from '@/stores/manga.store'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { useEffect, useRef, useState } from 'react'

type Props = {}

const ListManga = (props: Props) => {
  const { getListLatestManga, listLatestManga, isLoading } = useMangaStore()
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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
      setShowLeftArrow(element.scrollLeft > 0);
      setShowRightArrow(element.scrollWidth > element.scrollLeft + element.clientWidth);
    }
  };

  useEffect(() => {
    getListLatestManga()
  }, [])

  return (
    <div className='relative '>
      <div ref={scrollRef} onScroll={updateArrows} className='scroll-smooth snap-x snap-mandatory overflow-x-auto flex w-full snap select-none hide-scrollbar gap-4'>
        {isLoading ? <Loading /> : listLatestManga && listLatestManga.map((manga: MangaLatestResult, index: number) => (
          <Card key={index}
            href={'/manga/' + manga.id}
            id={manga.id}
            title={manga.title.vi ? manga.title.vi : manga.title.en}
            chapter={manga.lastChapter}
            time={manga.updatedAt}
            src={manga.coversUrl}
          />
        ))}
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
  )
}

export default ListManga