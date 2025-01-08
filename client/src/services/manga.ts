import http from "@/lib/http"
import { Chapter, ChapterBody, ChapterImage, Manga, MangaLatestResult, Statistics, Tag } from "@/models/manga"

const mangaService = {
    latestManga: (body: {page: number, reLimit: number}) => http.post<{data: Array<MangaLatestResult>, total: number}>('manga-dex/latest-manga', body),
    manga: (id: string) => http.get<{data: Manga}>('manga-dex/manga/' + id),
    chapters: (body: ChapterBody) => http.post<{data: any}>('manga-dex/chapters', body, { next: { tags: ['collection'] } }),
    statistics: (id: string) => http.get<{data: Statistics}>('manga-dex/statistics/' + id),
    chapterImages: (id: string) => http.get<{data: ChapterImage}>('manga-dex/chapter-image/' + id),
    chapter: (id: string) => http.get<{data: {getChapter: Chapter, manga: Manga}}>('manga-dex/chapter/' + id),
    tags: () => http.get<{data: Array<Tag>}>('manga-dex/tag'),
    mangaByTags: (body: {includedTags: Array<string>, excludedTags?: Array<string>, reLimit: number, page: number}) => http.post<{data: Array<MangaLatestResult>, total: number}>('manga-dex/manga-by-tag', body),
    mangaByTitles: (body: {page: number, reLimit: number, title: string}) => http.post<{data: Array<MangaLatestResult>, total: number}>('manga-dex/manga-by-title', body),
}

export default mangaService