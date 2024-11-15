import http from "@/lib/http"
import { Chapter, ChapterBody, ChapterImage, Manga, MangaLatestResult, Statistics, Tag } from "@/models/manga"

const mangaService = {
    latestManga: () => http.get('manga-dex/latest-manga'),
    manga: (id: string) => http.get<{data: Manga}>('manga-dex/manga/' + id),
    chapters: (body: ChapterBody) => http.post<{data: any}>('manga-dex/chapters', body, { next: { tags: ['collection'] } }),
    statistics: (id: string) => http.get<{data: Statistics}>('manga-dex/statistics/' + id),
    chapterImages: (id: string) => http.get<{data: ChapterImage}>('manga-dex/chapter-image/' + id),
    chapter: (id: string) => http.get<{data: {getChapter: Chapter, manga: Manga}}>('manga-dex/chapter/' + id),
    tags: () => http.get<{data: Array<Tag>}>('manga-dex/tag'),
    mangaByTags: (body: {includedTags: Array<string>, excludedTags?: Array<string>}) => http.post<{data: Array<MangaLatestResult>}>('manga-dex/manga-by-tag', body),
    mangaByTitles: (title: string) => http.get<{data: Array<MangaLatestResult>}>('manga-dex/manga-by-title/' + title),
}

export default mangaService