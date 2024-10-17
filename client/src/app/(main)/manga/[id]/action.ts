'use server'

import { ChapterBody, Relationship } from "@/models/manga";
import mangaService from "@/services/manga";
import { revalidateTag } from "next/cache";

export const getManga = async(id: string) => {
    try {
        const res = await mangaService.manga(id)
        if(res) return res.payload.data
    } catch (error) {
        console.log(error);
    }
}

export const getListChapter = async({chapterIndex, mangaId}: ChapterBody) => {
    try {
        revalidateTag('collection')
        const res = await mangaService.chapters({chapterIndex, mangaId})
        if(res) return res.payload.data
    } catch (error) {
        console.log(error);
    }
}

export const getStatistics = async(id: string) => {
    try {
        const res = await mangaService.statistics(id)
        if(res) return res.payload.data
    } catch (error) {
        console.log(error);
    }
}