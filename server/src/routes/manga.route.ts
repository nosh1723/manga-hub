import { Router } from "express";
import mangaController from "../controllers/manga.controller";

const mangaRoute = Router()

mangaRoute.get('/manga', mangaController.getAllManga)
mangaRoute.get('/latest-manga', mangaController.getLastUpdateManga)

export default mangaRoute