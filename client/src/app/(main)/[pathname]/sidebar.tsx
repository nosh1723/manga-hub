'use client'

import { Button } from "@/components/ui/button";
import { Tag } from "@/models/manga";
import useMangaStore from "@/stores/manga.store";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { MdFilterAlt } from "react-icons/md";

type Props = {}

const PATH_NAME = [
    { path: '/latest-updates', value: 'Latest Updates' },
    { path: '/mangas', value: 'All Manga' },
]

const SideBar = (props: Props) => {
    const { getTags, tags, getMangaByTag } = useMangaStore()
    const [includedTags, setIncludedTags] = useState<Array<string>>([])


    let delay = 0

    useEffect(() => {
        getTags()
    }, [])

    const handleGetTag = (tag: string) => {
        const checkDupliTag = includedTags.some(i => i === tag)

        if (checkDupliTag) {
            const newIncludedTags = includedTags.filter(i => i !== tag)
            setIncludedTags([...newIncludedTags])
        } else {
            setIncludedTags([...includedTags, tag])
        }
    }

    const handleFilterByTag = async () => {
        if (includedTags.length > 0) {
            getMangaByTag(includedTags)
        }
    }

    return (
        <div className="flex-1 h-max bg-[--gray-cus-600] rounded-md pb-4 px-0">
            <div className="flex justify-between items-center border-b-2 border-b-[--gray-cus-400] py-[10px] px-4">
                <div className="flex gap-1 items-center ">
                    <MdFilterAlt size={18} className="-mt-[2px]" />
                    <h3>Filters</h3>
                </div>
                <Button variant={"purple"} className="h-8 w-max" onClick={handleFilterByTag}>
                    <MagnifyingGlassIcon />
                </Button>
            </div>
            <div className="px-3 mt-2 mx-1 overflow-y-auto scroll-smooth custom-scrollbar custom-scrollbar-tag h-[520px]">

                <div className="py-2">
                    <h4>Genre</h4>
                    <div className="flex gap-2 flex-wrap mt-2">
                        {tags && tags?.map(tag => {
                            if (tag.attributes.group === 'format' || tag.attributes.group === 'genre') {
                                delay = delay + 0.03
                                return <motion.div
                                    key={tag.id}
                                    initial={{ y: -5 }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: delay }}
                                    className={`text-sm rounded-xl px-3 cursor-pointer ${includedTags.includes(tag.attributes.name.en) ? 'bg-slate-700 text-white' : 'bg-gray-300 text-slate-950'}`}
                                    onClick={() => handleGetTag(tag.attributes.name.en)}
                                >
                                    {tag.attributes.name.en}
                                </motion.div>
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
                                delay = delay + 0.03
                                return <motion.div
                                    key={tag.id}
                                    initial={{ y: -5 }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: delay }}
                                    className={`text-sm rounded-xl px-3 cursor-pointer ${includedTags.includes(tag.attributes.name.en) ? 'bg-slate-700 text-white' : 'bg-gray-300 text-slate-950'}`}
                                    onClick={() => handleGetTag(tag.attributes.name.en)}
                                >
                                    {tag.attributes.name.en}
                                </motion.div>
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
                                delay = delay + 0.03
                                return <motion.div
                                    key={tag.id}
                                    initial={{ y: -5 }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: delay }}
                                    className={`text-sm rounded-xl px-3 cursor-pointer ${includedTags.includes(tag.attributes.name.en) ? 'bg-slate-700 text-white' : 'bg-gray-300 text-slate-950'}`}
                                    onClick={() => handleGetTag(tag.attributes.name.en)}
                                >
                                    {tag.attributes.name.en}
                                </motion.div>
                            }
                            return <Fragment key={tag.id}></Fragment>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar