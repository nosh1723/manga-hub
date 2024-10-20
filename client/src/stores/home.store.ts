import { Chapter, ChapterImage, Manga, MangaLatestResult } from "@/models/manga"
import mangaService from "@/services/manga"
import { create } from "zustand"


type MangaState = {
    isLoading: boolean,
    error: any,
    path: string,
    setIsLoading: (isLoading: boolean) => void,
    setPath: (path: string) => void,
    reset: VoidFunction
}

const useHomeStore = create<MangaState>((set, get) => ({
    isLoading: false,
    error: '',
    path: '',

    setIsLoading(isLoading) {
        set({isLoading: isLoading})
    },

    setPath(path) {
        set({path: path})
    },

    reset: () => {
        set({
            isLoading: false,
            error: '',
            path: ''
        })
    }

}))

export default useHomeStore