import { Router } from "express";
import mangaController from "../controllers/manga.controller";

const mangaRoute = Router()

mangaRoute.get('/manga', mangaController.getAllManga)
mangaRoute.get('/manga/:id', mangaController.getManga)
mangaRoute.get('/latest-manga', mangaController.getLastUpdateManga)
mangaRoute.get('/statistics/:id', mangaController.statistics)

mangaRoute.post('/chapters', mangaController.listChapter)

export default mangaRoute