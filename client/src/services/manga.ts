import http from "@/lib/http"
import { Manga } from "@/models/manga"


const mangaService = {
    latestManga: () => http.get('manga-dex/latest-manga'),
    manga: (id: string) => http.get<{data: Manga}>('manga-dex/manga/' + id)
}

export default mangaService