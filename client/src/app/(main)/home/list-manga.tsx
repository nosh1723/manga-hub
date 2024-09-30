'use client'

import Card from '@/components/common/card'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { useRef, useState } from 'react'

type Props = {}

const ListManga = (props: Props) => {

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

  return (
    <div className='relative '>
      <div ref={scrollRef} onScroll={updateArrows} className='scroll-smooth snap-x snap-mandatory overflow-x-auto flex w-full snap select-none hide-scrollbar gap-4'>
        {[...Array(16)].map((i: any, index: number) => (
          <Card key={index} href='/details-manga' title='Renai no Jugyou' src='/image/sakamotox.jpg' />
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