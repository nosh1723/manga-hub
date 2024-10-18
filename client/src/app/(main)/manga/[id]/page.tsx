
import { Button } from '@/components/ui/button'
import { updatedTime } from '@/lib/utils'
import { ClockIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { getListChapter, getManga, getStatistics } from './action'
import ListChapter from './listChapter'
import HeaderButton from './header-button'

type Params = {
    params: {
        id: string;
    };
};

const DetailsManga = async ({ params }: Params) => {
    const manga = await getManga(params.id)
    const listChapter = await getListChapter({ mangaId: params.id })

    return (
        <div className='container px-40 mx-auto mt-14 flex flex-col items-center mb-20'>
            <div className='rounded-lg'>
                <div className='w-[1200px] rounded-t-lg bg-[--gray-cus-800] border-b-2 border-[--purple-cus-300]'>
                    <div className='relative w-full min-h-[320px]'>
                        <div className='absolute z-20 left-10 bottom-5 flex'>
                            <Image
                                src={manga?.coverUrl!}
                                width={190}
                                height={270}
                                alt='bg card manga'
                                className='rounded-lg '
                                placeholder="blur"
                                blurDataURL='/image/bocchi.png'
                            />
                            <div className='ml-4 flex flex-col justify-between'>
                                <div className='mt-2'>
                                    <span className='text-sm'>{manga?.author.data.attributes.name}</span>
                                    <h2 className='font-bold text-xl line-clamp-1 pr-10'>{manga?.attributes.title.en}</h2>
                                    <div className='flex items-center gap-1 mt-4 font-medium'>
                                        <ClockIcon width={17} height={17} className='-mt-[2px]' />
                                        <span>{updatedTime(manga?.attributes.updatedAt!)}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='w-[900px] flex flex-wrap items-center gap-2 mt-2'>
                                        {manga?.attributes.tags.map((tag, index) => (<div key={index} className='flex-none px-3 bg-[--gray-cus-100] rounded-2xl text-black text-sm'>{tag.attributes.name.en}</div>))}

                                    </div>
                                    <HeaderButton listChapter={listChapter}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[1200px] bg-[--gray-cus-600] rounded-b-lg px-5 py-7 flex gap-8 text-black'>
                    <div className='flex-[3]'>
                        <div className='p-4 bg-gray-100 rounded-md text-[--gray-cus-400] text-sm'>
                            <p className=''>{manga?.attributes.description.en} </p>
                        </div>
                        <ListChapter listChapter={listChapter!}/>
                    </div>
                    <div className='flex-[1]'>
                        <h2 className='text-gray-200 uppercase font-medium'>Same author</h2>
                        <div className='flex flex-col mt-3 gap-3'>
                            {manga && manga?.mangaByAuthor?.length !== 0 && manga?.mangaByAuthor?.map(manga => (
                                <div key={'manga-same-author' + manga.id}>
                                    <Link
                                        href={'/manga/' + manga.id}
                                        className='flex gap-2'>
                                        <Image
                                            src={manga.coversUrl}
                                            width={40}
                                            height={50}
                                            alt='bg manga same author'
                                            className='rounded-md'
                                            placeholder="blur"
                                            blurDataURL='/image/bocchi.png'
                                        />
                                        <div className='text-gray-200 text-sm font-medium'>
                                            <h4 className='line-clamp-2'>{manga.title.en}</h4>
                                            <div>
                                                <span>C. {manga.lastChapter || 'none'}</span> {" - "}
                                                <span>{updatedTime(manga.updatedAt)}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsManga