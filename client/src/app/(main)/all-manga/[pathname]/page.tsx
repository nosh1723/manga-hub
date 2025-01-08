'use client'

import SideBar from "./sidebar";
import List from "./list";
import useMangaStore from "@/stores/manga.store";
import { useEffect } from "react";

type Props = {
}

const AllManga = (props: Props) => {
    const { reset } = useMangaStore()
    useEffect(() => { () => reset() }, [])
    return (
        <div className='container py-8 md:py-16 lg:px-14 xl:px-24 '>
            <h2 className="text-lg font-medium">Latest Updates</h2>
            <div className="flex flex-col gap-6 md:gap-0 md:flex-row mt-8 xl:gap-6 ">
                <SideBar />
                <List />
            </div>
        </div>
    )
}

export default AllManga