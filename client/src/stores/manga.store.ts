import { Manga, MangaLatestResult, Tag } from "@/models/manga"
import mangaService from "@/services/manga"
import { create } from "zustand"


type MangaState = {
    isLoading: boolean,
    isLoadingMangaByTitle: boolean,
    isDataLoading: boolean,
    error: any,
    lazyLoad: boolean,
    total: number,
    manga: Manga | null,
    mangaByTag: Array<MangaLatestResult> | null,
    mangaByTitle: Array<MangaLatestResult> | null,
    allManga: Array<MangaLatestResult> | null,
    tags: Array<Tag> | null,
    includedTags: Array<string>,
    listLatestManga: Array<MangaLatestResult> | null,
    getListLatestManga: (page?: number, reLimit?: number) => Promise<any>,
    getManga: (id: string) => Promise<void> | null,
    getTags: () => Promise<void> | null,
    getMangaByTag: (includedTags: Array<string>, excludedTags?: Array<string>, page?: number, reLimit?: number) => Promise<any>,
    getMangaByTitle: (title: string, page?: number, reLimit?: number) => Promise<any>,
    setLazyLoad: (lazyLoad: boolean) => void,
    setAllManga: (manga: Array<MangaLatestResult> | null) => void,
    setIncludedTags: (includedTags: Array<string>) => void,
    reset: VoidFunction
}

const useMangaStore = create<MangaState>((set, get) => ({
    listLatestManga: null,
    isLoading: true,
    isLoadingMangaByTitle: false,
    isDataLoading: false,
    total: 0,
    error: '',
    lazyLoad: true,
    manga: null,
    mangaByTag: null,
    mangaByTitle: null,
    allManga: null,
    tags: null,
    includedTags: [],

    getListLatestManga: async ( page: number = 0, reLimit: number = 15 ) => {
        try {
            set({ isLoading: true, isDataLoading: true })
            get().reset()
            const body = { reLimit, page }
            const res = await mangaService.latestManga(body)
            
            set({ listLatestManga: res.payload.data, total: res.payload.total})
            return res.payload
        } catch (error: any) {
            set({ error: error.payload })
        } finally {
            set({ isLoading: false, isDataLoading: false })
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

    getMangaByTag: async (includedTags: Array<string>, excludedTags?: Array<string>, page: number = 0, reLimit: number = 18) => {
        try {
            set({ isLoading: true, isDataLoading: true})
            const body = {
                includedTags,
                excludedTags,
                reLimit, 
                page
            }
            const res = await mangaService.mangaByTags(body)
            if(!res) return

            set({mangaByTag: res.payload.data, total: res.payload.total})
            return res.payload
        } catch (error: any) {
            set({ error: error.payload })
        } finally {
            set({ isLoading: false, isDataLoading: false })
        }
    },

    getMangaByTitle: async (title: string, page: number = 0, reLimit: number = 18) => {
        try {
            set({ isLoadingMangaByTitle: true })
            if(title) {
                const body = { reLimit, page, title }
                const res = await mangaService.mangaByTitles(body)
                if(!res) return

                set({mangaByTitle: res.payload.data})
                return res.payload
            }
        } catch (error: any) {
            set({ error: error.payload })
        } finally {
            set({ isLoadingMangaByTitle: false })
        }
    },

    setLazyLoad: (lazyLoad: boolean) => {
        set({ lazyLoad: lazyLoad })
    },

    setAllManga: (manga: Array<MangaLatestResult> | null) => {
        set({ allManga: manga })
    },

    setIncludedTags: (includedTags: Array<string>) => {
        set({ includedTags: includedTags })
    },

    reset: () => {
        set({
            isLoading: false,
            error: '',
            mangaByTitle: null,
            allManga: null,
            total: 0,
            includedTags: [],
        })
    }
}))

export default useMangaStore