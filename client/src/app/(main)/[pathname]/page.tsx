'use client'

import useMangaStore from "@/stores/manga.store";
import { usePathname } from "next/navigation"
import { Fragment, useEffect } from "react";
import { MdFilterAlt } from "react-icons/md";

type Props = {}

const PATH_NAME = [
    { path: '/latest-updates', value: 'Latest Updates' },
    { path: '/mangas', value: 'All Manga' },
]

const ListManga = (props: Props) => {
    const path = usePathname()
    const { getTags, tags } = useMangaStore()

    useEffect(() => {
        getTags()
    }, [])

    const name = PATH_NAME.find(i => i.path === path)?.value
    return (
        <div className='container py-20 px-24 '>
            <h2 className="text-lg font-medium">{name}</h2>
            <div className="flex mt-8 gap-6 ">
                <div className="flex-1 bg-[--gray-cus-600] rounded-md p-4 px-0">
                    <div className="flex gap-1 overflow-hidden items-center border-b-2 border-b-[--gray-cus-400] pb-2 px-4">
                        <MdFilterAlt size={18} className="-mt-[2px]" />
                        <h3>Filters</h3>
                    </div>
                    <div className="px-3 mx-1 overflow-y-auto scroll-smooth custom-scrollbar custom-scrollbar-tag h-[520px]">

                        <div className="py-2 ">
                            <h4>Genre</h4>
                            <div className="flex gap-2 flex-wrap mt-2">
                                {tags && tags?.map(tag => {
                                    if (tag.attributes.group === 'format' || tag.attributes.group === 'genre') {
                                        return <div key={tag.id} className="bg-gray-300 text-slate-950 text-sm rounded-xl px-3 cursor-pointer">
                                            {tag.attributes.name.en}
                                        </div>
                                    }
                                    return <Fragment key={tag.id}></Fragment>
                                })}
                            </div>
                        </div>

                        <div className="py-2 ">
                            <h4>Theme</h4>
                            <div className="flex gap-2 flex-wrap mt-2">
                                {tags && tags?.map(tag => {
                                    if (tag.attributes.group === 'theme') {
                                        return <div key={tag.id} className="bg-gray-300 text-slate-950 text-sm rounded-xl px-3 cursor-pointer">
                                            {tag.attributes.name.en}
                                        </div>
                                    }
                                    return <Fragment key={tag.id}></Fragment>
                                })}
                            </div>
                        </div>
                        <div className="py-2">
                            <h4>Content Warning</h4>
                            <div className="flex gap-2 flex-wrap mt-2">
                                {tags && tags?.map(tag => {
                                    if (tag.attributes.group === 'content') {
                                        return <div key={tag.id} className="bg-gray-300 text-slate-950 text-sm rounded-xl px-3 cursor-pointer">
                                            {tag.attributes.name.en}
                                        </div>
                                    }
                                    return <Fragment key={tag.id}></Fragment>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-[4]">brrr</div>
            </div>
        </div>
    )
}

export default ListManga