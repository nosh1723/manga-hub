import { Router } from "express";
import mangaController from "../controllers/manga.controller";

const mangaRoute = Router()

mangaRoute.get('/manga', mangaController.getListManga)
mangaRoute.get('/manga-by-title/:title', mangaController.getListManga)
mangaRoute.get('/manga/:id', mangaController.getManga)
mangaRoute.get('/latest-manga', mangaController.getListManga)
mangaRoute.get('/statistics/:id', mangaController.statistics)
mangaRoute.get('/chapter-image/:id', mangaController.getChapterImages)
mangaRoute.get('/chapter/:id', mangaController.getChapter)
mangaRoute.get('/tag', mangaController.getAllTag)

mangaRoute.post('/chapters', mangaController.listChapter)
mangaRoute.post('/manga-by-tag', mangaController.getMangaByTag)

export default mangaRoute