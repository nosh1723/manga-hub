import { mangadexAxios } from "./axios";


export const manga = (limit: number, offset: number, params?: {[key: string]: string}) => mangadexAxios.get('manga', {
    params: {
        limit,
        offset,
        ...params
    }
})

export const coverArt = (id: string) => mangadexAxios.get('cover/' + id)


