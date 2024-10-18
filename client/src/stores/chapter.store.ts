import { Chapter, ChapterImage, Manga, MangaLatestResult } from "@/models/manga"
import mangaService from "@/services/manga"
import { create } from "zustand"


type MangaState = {
    isLoading: boolean,
    error: any,
    chapterId: string,
    chapter: { getChapter: Chapter, manga: Manga } | null,
    chapterImage: ChapterImage | null,
    manga: Manga | null,
    getChapter: (id: string) => Promise<void>,
    getChapterImages: (id: string) => Promise<void>,
    handleNext: (chapter: Array<Chapter>, currentChapterIndex: number, canNext: boolean) => void,
    handlePrev: (chapter: Array<Chapter>, currentChapterIndex: number, canPrev: boolean) => void,
    reset: VoidFunction
}

const useChapterStore = create<MangaState>((set, get) => ({
    isLoading: true,
    error: '',
    manga: null,
    chapter: null,
    chapterImage: null,
    chapterId: '',

    getChapter: async (id: string) => {
        try {
            set({ isLoading: true })
            const res = await mangaService.chapter(id)
            if (!res) return

            set({ chapter: res.payload.data })
        } catch (error) {
            set({ error: error })
        } finally {
            set({ isLoading: false })
        }
    },

    getChapterImages: async (id: string) => {
        try {
            set({ isLoading: true })
            const res = await mangaService.chapterImages(id)
            if (!res) return

            set({ chapterImage: res.payload.data })
        } catch (error) {
            set({ error: error });
        } finally {
            set({ isLoading: false })
        }
    },

    handleNext: (chapters: Array<Chapter>, currentChapterIndex: number, canNext: boolean) => {
        if(canNext){
            set({chapterId: chapters[currentChapterIndex + 1].id})
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },

    handlePrev: (chapters: Array<Chapter>, currentChapterIndex: number, canPrev: boolean) => {
        if(canPrev){
            set({chapterId: chapters[currentChapterIndex - 1].id})
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },

    reset: () => {
        set({
            isLoading: true,
            error: '',
            manga: null,
            chapter: null,
            chapterImage: null
        })
    }

}))

export default useChapterStore