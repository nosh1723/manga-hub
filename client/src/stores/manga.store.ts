import { Manga, MangaLatestResult } from "@/models/manga"
import mangaService from "@/services/manga"
import { create } from "zustand"


type MangaState = {
    isLoading: boolean,
    error: any,
    lazyLoad: boolean,
    manga: Manga | null,
    listLatestManga: Array<MangaLatestResult> | null,
    getListLatestManga: () => Promise<void>,
    getManga: (id: string) => Promise<void> | null,
    setLazyLoad: (lazyLoad: boolean) => void
}

const useMangaStore = create<MangaState>((set, get) => ({
    listLatestManga: null,
    isLoading: false,
    error: '',
    lazyLoad: true,
    manga: null,

    getListLatestManga: async() => {
        try {
            set({isLoading: true})
            const res: any = await mangaService.latestManga()

            set({listLatestManga: res.payload.data})
            
        } catch (error: any) {
            set({error: error.payload})
        } finally{
            set({isLoading: false})
        }
    },

    getManga: async(id: string) => {
        try {
            set({isLoading: true})
            const res = await mangaService.manga(id)

            set({manga: res.payload.data})
        } catch (error: any) {
            set({error: error.payload})
        } finally{
            set({isLoading: false})
        }
    },

    setLazyLoad: (lazyLoad: boolean) => {
        set({lazyLoad: lazyLoad})
    }
}))

export default useMangaStore