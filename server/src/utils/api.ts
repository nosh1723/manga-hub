import { Manga } from "../interface/manga";
import { mangadexAxios } from "./axios";


export const mangaList = (limit: number, offset: number, params?: {[key: string]: string}) => mangadexAxios.get('manga', {
    params: {
        limit,
        offset,
        ...params
    }
})

export const manga = (id: string, params?: {[key: string]: string}) => mangadexAxios.get('manga/' + id, {
    params: {
        id,
        ...params
    }
})

export const coverArt = (id: string) => mangadexAxios.get('cover/' + id)

export const artist = (id: string) => mangadexAxios.get('artist/' + id)

export const author = (id: string) => mangadexAxios.get('author/' + id)

export const statistics = (id: string) => mangadexAxios.get('statistics/manga/' + id)

export const chapters = (id: string, params?: {[key: string]: any}) => mangadexAxios.get('manga/' + id + '/feed', {
    params: {
        ...params
    }
})


