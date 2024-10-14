import { Router } from "express";
import authRouter from "./auth.route";
import mangaRoute from "./manga.route";

const router = Router();

router.use('/auth', authRouter)
router.use('/manga-dex', mangaRoute)

export default router;
