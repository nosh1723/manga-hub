import { Manga, MangaLatestResult, Tag } from "@/models/manga"
import mangaService from "@/services/manga"
import { create } from "zustand"


type MangaState = {
    isLoading: boolean,
    error: any,
    lazyLoad: boolean,
    manga: Manga | null,
    mangaByTag: Array<MangaLatestResult> | null,
    tags: Array<Tag> | null
    listLatestManga: Array<MangaLatestResult> | null,
    getListLatestManga: () => Promise<void>,
    getManga: (id: string) => Promise<void> | null,
    getTags: () => Promise<void> | null,
    getMangaByTag: (includedTags: Array<string>, excludedTags?: Array<string>) => Promise<void>,
    setLazyLoad: (lazyLoad: boolean) => void,
    reset: VoidFunction
}

const useMangaStore = create<MangaState>((set, get) => ({
    listLatestManga: null,
    isLoading: true,
    error: '',
    lazyLoad: true,
    manga: null,
    mangaByTag: null,
    tags: null,

    getListLatestManga: async () => {
        try {
            set({ isLoading: true })
            const res: any = await mangaService.latestManga()

            set({ listLatestManga: res.payload.data })

        } catch (error: any) {
            set({ error: error.payload })
        } finally {
            set({ isLoading: false })
        }
    },

    getManga: async (id: string) => {
        try {
            set({ isLoading: true })
            const res = await mangaService.manga(id)

            set({ manga: res.payload.data })
        } catch (error: any) {
            set({ error: error.payload })
        } finally {
            set({ isLoading: false })
        }
    },

    getTags: async () => {
        try {
            set({ isLoading: true })
            const res = await mangaService.tags()

            set({ tags: res.payload.data })
        } catch (error: any) {
            set({ error: error.payload })
        } finally {
            set({ isLoading: false })
        }
    },

    getMangaByTag: async (includedTags: Array<string>, excludedTags?: Array<string>) => {
        try {
            set({ isLoading: true })
            const body = {
                includedTags,
                excludedTags
            }
            const res = await mangaService.mangaByTags(body)
            if(!res) return

            set({mangaByTag: res.payload.data})
        } catch (error: any) {
            set({ error: error.payload })
        } finally {
            set({ isLoading: false })
        }
    },

    setLazyLoad: (lazyLoad: boolean) => {
        set({ lazyLoad: lazyLoad })
    },

    reset: () => {
        set({
            isLoading: false,
            error: '',
            mangaByTag: null
        })
    }
}))

export default useMangaStore