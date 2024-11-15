import Image from 'next/image'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Search } from '../../common/search'
import { debounce, updatedTime } from '@/lib/utils'
import useMangaStore from '@/stores/manga.store'
import { ReloadIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { MangaLatestResult } from '@/models/manga'
import useHomeStore from '@/stores/home.store'

type Props = {}

const SearchBarHeader = (props: Props) => {
    const router = useRouter()
    const { getMangaByTitle, isLoadingMangaByTitle } = useMangaStore()
    const { setIsLoading, setPath } = useHomeStore()

    const [value, setValue] = useState<string>('')
    const [data, setData] = useState<Array<MangaLatestResult> | null>(null)
    const [isListVisible, setIsListVisible] = useState(false);

    const searchBarRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
            setIsListVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChangeSearch = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
        const res = await getMangaByTitle(e.target.value)
        setData(res)
        setValue(e.target.value)
    }, 300)

    const handleLoadMore = () => {
        if (searchInputRef.current && value !== '' && data) {
            router.push('/all-manga/' + value)
            searchInputRef.current.blur()
            searchInputRef.current.value = ''
            setIsListVisible(false)
            setData(null)
        }
    }
    return (
        <div ref={searchBarRef} className='relative h-max'>
            <Search
                ref={searchInputRef}
                className='md:w-[18rem]'
                onChange={handleChangeSearch}
                onClick={() => setIsListVisible(true)}
                onKeyDown={e => {
                    if (e.key === 'Enter') handleLoadMore()
                }}
            />
            {value?.length && isListVisible ?
                <motion.div
                    initial={{ height: '50%' }}
                    animate={{ height: 'max-content' }}
                    className='absolute z-[999] w-full overflow-hidden mt-2 rounded-md bg-[--dark-cus-900]'>
                    {!isLoadingMangaByTitle ?
                        (data?.length ? <div className='flex flex-col gap-2 p-3'>
                            {data?.map((manga, index) => {
                                if (index < 5) {
                                    return (
                                        <motion.div
                                            key={manga?.id}
                                            whileHover={{ scale: 1.03 }}
                                            onClick={() => {
                                                if (searchInputRef.current && value !== '') {
                                                    searchInputRef.current.value = ''
                                                    setData(null)
                                                }
                                            }}
                                        >
                                            <div
                                                onClick={() => {
                                                    setIsLoading(true)
                                                    setPath('/manga/' + manga.id)
                                                }}
                                                className='flex gap-2 cursor-pointer'>
                                                <Image
                                                    src={manga.coversUrl}
                                                    width={40}
                                                    height={50}
                                                    alt='bg manga same author'
                                                    className='rounded-sm'
                                                    placeholder="blur"
                                                    blurDataURL='/image/bocchi.png'
                                                />
                                                <div className='text-gray-200 text-sm font-medium'>
                                                    <h4 className='line-clamp-2'>{manga.title.en}</h4>
                                                    <div>
                                                        <span>C. {manga.lastChapter}</span> {" - "}
                                                        <span>{updatedTime(manga.updatedAt)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                }
                            })}
                            {data && data?.length >= 5 &&
                                <div onClick={handleLoadMore} className='text-center hover:opacity-40 cursor-pointer'>Load more...</div>
                            }
                        </div> : <></>) :
                        <div className='flex justify-center items-center p-3'>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        </div>
                    }
                </motion.div>
                : <></>}

        </div>
    )
}

export default SearchBarHeader