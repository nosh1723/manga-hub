import { Manga, MangaLatestResult, Tag } from "@/models/manga"
import mangaService from "@/services/manga"
import { create } from "zustand"


type MangaState = {
    isLoading: boolean,
    isLoadingMangaByTitle: boolean,
    isDataLoading: boolean,
    error: any,
    lazyLoad: boolean,
    manga: Manga | null,
    mangaByTag: Array<MangaLatestResult> | null,
    mangaByTitle: Array<MangaLatestResult> | null,
    allManga: Array<MangaLatestResult> | null,
    tags: Array<Tag> | null
    listLatestManga: Array<MangaLatestResult> | null,
    getListLatestManga: () => Promise<any>,
    getManga: (id: string) => Promise<void> | null,
    getTags: () => Promise<void> | null,
    getMangaByTag: (includedTags: Array<string>, excludedTags?: Array<string>) => Promise<void>,
    getMangaByTitle: (title: string) => Promise<any>,
    setLazyLoad: (lazyLoad: boolean) => void,
    setAllManga: (manga: Array<MangaLatestResult> | null) => void,
    reset: VoidFunction
}

const useMangaStore = create<MangaState>((set, get) => ({
    listLatestManga: null,
    isLoading: true,
    isLoadingMangaByTitle: false,
    isDataLoading: false,
    error: '',
    lazyLoad: true,
    manga: null,
    mangaByTag: null,
    mangaByTitle: null,
    allManga: null,
    tags: null,

    getListLatestManga: async () => {
        try {
            set({ isLoading: true, isDataLoading: true })
            get().reset()
            const res: any = await mangaService.latestManga()

            set({ listLatestManga: res.payload.data })
            return res.payload.data
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

    getMangaByTag: async (includedTags: Array<string>, excludedTags?: Array<string>) => {
        try {
            set({ isLoading: true, isDataLoading: true})
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
            set({ isLoading: false, isDataLoading: false })
        }
    },

    getMangaByTitle: async (title: string) => {
        try {
            set({ isLoadingMangaByTitle: true })
            if(title) {
                const res = await mangaService.mangaByTitles(title)
                if(!res) return

                set({mangaByTitle: res.payload.data})
                return res.payload.data
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

    reset: () => {
        set({
            isLoading: false,
            error: '',
            mangaByTitle: null,
            allManga: null
        })
    }
}))

export default useMangaStore