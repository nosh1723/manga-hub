'use client'

import ListManga from "@/components/all-manga/list";
import useLimit from "@/hooks/use-limit";
import { MangaLatestResult } from "@/models/manga";
import useMangaStore from "@/stores/manga.store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
}

const AllManga = (props: Props) => {
    const {limitForSearch} = useLimit()
    const searchParams = useSearchParams().get('title');

    const {
        reset,
        getMangaByTitle,
        isLoadingMangaByTitle,
    } = useMangaStore()

    const [data, setData] = useState<Array<MangaLatestResult>>([])
    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        if(limitForSearch !== 0) {
            getMangaByTitle(searchParams!, 0, limitForSearch).then((res) => {
                setData(res.data)
                setTotal(res.total)
            })
        }
        return () => reset()
    }, [searchParams, limitForSearch])

    const handleLoadMore = () => {
        if(!isLoadingMangaByTitle && searchParams) {
            setPage(page + 1)
            getMangaByTitle(searchParams, page, limitForSearch).then((res) => {
                // console.log(res);
                if(res) {
                    setData([...data, ...res.data])
                }
            })
        }
    }

    return (
        <div className='container py-8 md:py-16 lg:px-14 xl:px-24 '>
            <h2 className="text-lg font-medium">{`Search with the keyword '${searchParams}'`}</h2>
            <div className="flex justify-center w-full mt-8">
                <div className="md:min-h-[20rem] md:w-[calc(100%-5rem)]">
                    <ListManga
                        page={page}
                        data={data}
                        isHideBtnLoadMore={data.length === total}
                        handleLoadMore={handleLoadMore}
                    />
                </div>
            </div>
        </div>
    )
}

export default AllManga