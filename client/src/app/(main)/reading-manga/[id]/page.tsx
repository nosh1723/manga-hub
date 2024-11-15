'use client'

import useChapterStore from '@/stores/chapter.store'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Toolbar from './toolbar'

type Params = {
  params: {
    id: string;
  };
};

const ReadingManga = ({ params }: Params) => {
  const { chapter,
    getChapter,
    getChapterImages,
    chapterImage,
    reset,
    chapterId
  } = useChapterStore()
  const { id } = useParams()
  const route = useRouter()
  const baseImageUrl = `${chapterImage?.baseUrl}/data/${chapterImage?.chapter.hash}`

  useEffect(() => {
    getChapter(id as string)
    getChapterImages(id as string)

    return () => reset()
  }, [])

  useEffect(() => {
    if(Boolean(chapterId)){
      route.push('/reading-manga/' + chapterId)
    }
  }, [chapterId])

  return (
    <div className='container relative px-0 lg:px-40 mx-auto mt-14 flex flex-col items-center mb-20'>
      <Toolbar />
      <div className='w-full px-6 flex justify-start'>
        <Link href={'/manga/' + chapter?.manga?.id} className='flex items-center gap-1 hover:opacity-90'>
          <div className='text-gray-400 flex items-center gap-2 max-w-[70%] lg:max-w-full'>
            <ArrowLeftIcon width={17} height={17} className='-mt-[1px]' />
            <span className='line-clamp-1'>{chapter?.manga?.attributes?.title?.en}</span>
          </div> {" | "}
          <span className='line-clamp-1'>Chap {chapter?.getChapter?.attributes?.chapter}: {chapter?.getChapter?.attributes?.title}</span>
        </Link>
      </div>

      <div className='mt-10 flex flex-col gap-4'>
        {chapterImage && chapterImage.chapter.data.map(image => (
          <div key={'anh chapter' + image} className='lg:max-w-[1200px]'>
            <Image
              src={baseImageUrl + "/" + image}
              width={800}
              height={500}
              alt='page manga'
              placeholder="blur"
              blurDataURL='/image/bocchi.png'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReadingManga