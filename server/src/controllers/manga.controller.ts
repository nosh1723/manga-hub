import { Request, Response } from "express"
import STATUS from "../utils/status"
import { coverArt, manga } from "../utils/api"
import { Manga } from "../interface/manga"
import { Cover } from "../interface/covers"

interface ResultCovers {
    fileName: string,
    mangaId: string
}

interface CoversArtRes {
    mangaId: string,
    coversUrl: string
}

class MangaController {
    getListCoversArt = async(data: Array<Manga>) => {
        try {
            if(!data) return
            const resultCovers: Array<ResultCovers> = await Promise.all(data.map(async(i) => {
                const coverId = i.relationships.find(author => author.type === "cover_art")?.id
                const res: Cover = (await coverArt(coverId as string)).data.data
                return {
                    fileName: res.attributes.fileName,
                    mangaId: i.id
                }
            }))

            if(!resultCovers) return

            const listCoversUrl: Array<CoversArtRes> = resultCovers.map(cover => {
                return {
                    mangaId: cover.mangaId,
                    coversUrl: `https://uploads.mangadex.org/covers/${cover.mangaId}/${cover.mangaId}` 
                }
            })
            return listCoversUrl
        } catch (error: any) {
            console.log(error);
            return new Error(error)
        }
    }

    getAllManga = async(req: Request, res: Response) => {
        try {
            const limit: number = 20
            let offset: number = 0
            const resAllManga = await manga(limit, offset)
            const result = await resAllManga.data
            return res.status(STATUS.OK).json({...result})
        } catch (error: any) {
            return res.status(STATUS.INTERNAL).json(error)
        }
    }

    getLastUpdateManga = async(req: Request, res: Response) => {
        try {
            const limit: number = 5
            const offset: number = 0
            const order = {
                updatedAt: 'desc'
            }
            const finalOrderQuery: {[key: string]: string} = {};

            for (const [key, value] of Object.entries(order)) {
                finalOrderQuery[`order[${key}]`] = value;
            }

            const resAllManga = (await manga(limit, offset, {...finalOrderQuery})).data
            const listCoversUrl: Array<CoversArtRes> | any = await this.getListCoversArt(resAllManga?.data)
            const result = resAllManga?.data.map((i: Manga) => {
                const coversUrl = listCoversUrl.find((covers: CoversArtRes) => covers.mangaId === i.id).coversUrl
                return {
                    id: i.id,
                    title: i.attributes.title,
                    lastChapter: i.attributes.lastChapter,
                    updatedAt: i.attributes.updatedAt,
                    coversUrl
                }
            })
            return res.status(STATUS.OK).json({
                status: STATUS.OK,
                data: result
            })
        } catch (error: any) {
            console.log(error);
            return res.status(STATUS.INTERNAL).json(error)
        }
    }
}

export default new MangaController()