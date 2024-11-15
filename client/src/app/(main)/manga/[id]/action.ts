'use server'

import { ChapterBody, Relationship } from "@/models/manga";
import mangaService from "@/services/manga";
import { revalidateTag } from "next/cache";


export const getManga = async(id: string) => {
    try {
        revalidateTag('manga')
        const res = await mangaService.manga(id)
        if(res) return res.payload.data
    } catch (error) {
        console.log(error);
    }
}

export const getListChapter = async({mangaId}: ChapterBody) => {
    try {
        const res = await mangaService.chapters({mangaId})
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