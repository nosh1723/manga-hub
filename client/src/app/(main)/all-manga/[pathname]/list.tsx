'use client'

import ListManga from '@/components/all-manga/list'
import useLimit from '@/hooks/use-limit'
import { MangaLatestResult } from '@/models/manga'
import useMangaStore from '@/stores/manga.store'
import { useEffect, useState } from 'react'

type Props = {
}

const List = (props: Props) => {
    const {limit} = useLimit()

    const {
        getListLatestManga,
        mangaByTag,
        isDataLoading,
        includedTags,
        getMangaByTag,
        total
    } = useMangaStore()

    const [data, setData] = useState<Array<MangaLatestResult>>([])
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        if(limit !== 0){
            getListLatestManga(0, limit).then(data => {
                setData(data.data)
            })
        }
    }, [limit])

    useEffect(() => {
        if (mangaByTag) setData(mangaByTag)
    }, [mangaByTag])

    const handleLoadMore = () => {
        if (!isDataLoading) {
            setPage(page + 1)
            if(includedTags) {
                getMangaByTag(includedTags, [], page, limit).then((res) => {
                    // console.log(res);
                    if (res) {
                        setData([...data!, ...res])
                    }
                })
                return
            } 
            getListLatestManga(page, limit).then((res) => {
                // console.log(res);
                if (res) {
                    setData([...data!, ...res])
                }
            })
        }
    }

    return (
        <div className="flex-[4] lg:flex-[3.5]">
            <ListManga
                data={data}
                page={page}
                isHideBtnLoadMore={data.length === total}
                isLoading={isDataLoading}
                handleLoadMore={handleLoadMore}
            />
        </div>
    )
}

export default List