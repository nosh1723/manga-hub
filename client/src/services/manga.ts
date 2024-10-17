import http from "@/lib/http"
import { Chapter, ChapterBody, Manga, Statistics } from "@/models/manga"

const mangaService = {
    latestManga: () => http.get('manga-dex/latest-manga'),
    manga: (id: string) => http.get<{data: Manga}>('manga-dex/manga/' + id),
    chapters: (body: ChapterBody) => http.post<{data: any}>('manga-dex/chapters', body, { next: { tags: ['collection'] } }),
    statistics: (id: string) => http.get<{data: Statistics}>('manga-dex/statistics/' + id),
}

export default mangaService