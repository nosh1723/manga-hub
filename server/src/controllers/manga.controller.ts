import { Request, Response } from "express"
import STATUS from "../utils/status"
import { author, chapter, chapterImage, chapters, coverArt, manga, mangaList, statistics } from "../utils/api"
import { Attributes, Chapter, Language, Manga, Relationship } from "../interface/manga"
import { Cover, CoversArtRes, ResultCovers } from "../interface/covers"
import { ObjectFormat } from "../interface/common"

interface ListChapter {
    data: Array<Chapter>,
    total: number
}

class MangaController {
    orderParams = (order: ObjectFormat, finalOrderQuery: ObjectFormat) => {
        for (const [key, value] of Object.entries(order)) {
            finalOrderQuery[`order[${key}]`] = value;
        }
        return finalOrderQuery
    }

    getListChapter = async(mangaId: string, params?: ObjectFormat): Promise<ListChapter | Error | undefined> => {
        try {
            if (!mangaId) return
            const language = ['en']
            const order = this.orderParams({ chapter: 'desc' }, {})
            const res: ListChapter = (await chapters(mangaId, { ...order, translatedLanguage: language, ...params })).data

            return {
                ...res,
                total: res.total
            }
        } catch (error: any) {
            console.log(error);
            return new Error(error)
        }
    }

    getAuthor = async(id: string) => {
        try {
            if(!id) return
            const result = (await author(id)).data

            return result
        } catch (error: any) {
            console.log(error);
            return new Error(error)
        }
    }

    getMangaByAuthor = async(authorId: string) => {
        try {
            if(!authorId) return
            const limit: number = 20
            let offset: number = 0
            const mangaByAuthor = (await mangaList(limit, offset, {authorOrArtist: authorId})).data

            const listCoversUrl: Array<CoversArtRes> | any = await this.getListCoversArt(mangaByAuthor?.data)
            const result = await Promise.all(mangaByAuthor?.data.map(async (manga: Manga) => {
                const coversUrl = listCoversUrl.find((covers: CoversArtRes) => covers.mangaId === manga.id).coversUrl
                const chapter: any = await this.getListChapter(manga.id)
                return {
                    id: manga.id,
                    title: manga.attributes.title,
                    lastChapter: chapter ? chapter.data[0]?.attributes.chapter : '',
                    updatedAt: manga.attributes.updatedAt,
                    coversUrl
                }
            }))
            return result
        } catch (error: any) {
            console.log(error);
            return new Error(error)
        }
    }

    getCoversArt = async(manga: Manga) => {
        try {
            if (!manga) return
            const coverId = manga.relationships.find(author => author.type === "cover_art")?.id
            const res: Cover = (await coverArt(coverId as string)).data.data

            if (!res) return

            const coverUrl= {
                mangaId: manga.id,
                coversUrl: `https://uploads.mangadex.org/covers/${manga.id}/${res.attributes.fileName}`
            }
            return coverUrl
        } catch (error: any) {
            console.log(error);
            return new Error(error)
        }
    }

    getListCoversArt = async (data: Array<Manga>) => {
        try {
            if (!data) return
            const resultCovers: Array<ResultCovers> = await Promise.all(data.map(async (i) => {
                const coverId = i.relationships.find(author => author.type === "cover_art")?.id
                const res: Cover = (await coverArt(coverId as string)).data.data
                return {
                    fileName: res.attributes.fileName,
                    mangaId: i.id
                }
            }))

            if (!resultCovers) return

            const listCoversUrl: Array<CoversArtRes> = resultCovers.map(cover => {
                return {
                    mangaId: cover.mangaId,
                    coversUrl: `https://uploads.mangadex.org/covers/${cover.mangaId}/${cover.fileName}`
                }
            })
            return listCoversUrl
        } catch (error: any) {
            console.log(error);
            return new Error(error)
        }
    }

    getAllManga = async (req: Request, res: Response) => {
        try {
            const limit: number = 20
            let offset: number = 0
            const resAllManga = await mangaList(limit, offset)
            const result = await resAllManga.data
            return res.status(STATUS.OK).json({ ...result })
        } catch (error: any) {
            return res.status(STATUS.INTERNAL).json(error)
        }
    }

    getLastUpdateManga = async (req: Request, res: Response) => {
        try {
            const limit: number = 16
            const offset: number = 0
            const order = this.orderParams({ updatedAt: 'desc' }, {})

            const resAllManga = (await mangaList(limit, offset, { ...order })).data
            const listCoversUrl: Array<CoversArtRes> | any = await this.getListCoversArt(resAllManga?.data)
            const result = await Promise.all(resAllManga?.data.map(async (manga: Manga) => {
                const coversUrl = listCoversUrl.find((covers: CoversArtRes) => covers.mangaId === manga.id).coversUrl
                const chapter: any = await this.getListChapter(manga.id)
                return {
                    id: manga.id,
                    title: manga.attributes.title,
                    lastChapter: chapter.data[0]?.attributes.chapter ,
                    updatedAt: manga.attributes.updatedAt,
                    coversUrl
                }
            }))
            return res.status(STATUS.OK).json({
                status: STATUS.OK,
                data: result
            })
        } catch (error: any) {
            console.log(error);
            return res.status(STATUS.INTERNAL).json(error)
        }
    }

    getManga = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const getManga = (await manga(id)).data.data as Manga
            const attributes: Attributes = getManga.attributes

            const authorId = getManga.relationships.find(re => re.type === 'author')?.id
            const author = await this.getAuthor(authorId as string)
            const mangaByAuthor = await this.getMangaByAuthor(authorId as string)
            
            const coverUrl: any = await this.getCoversArt(getManga)

            const result = {
                id: getManga.id,
                type: getManga.type,
                attributes: {
                    title: attributes.title,
                    description: attributes.description,
                    year: attributes.year,
                    tags: attributes.tags,
                    updatedAt: attributes.updatedAt
                },
                relationships: getManga.relationships,
                coverUrl: coverUrl.coversUrl,
                author,
                mangaByAuthor
            }

            return res.status(STATUS.OK).json({
                status: STATUS.OK,
                data: result
            })
        } catch (error: any) {
            console.log(error);
            return res.status(STATUS.INTERNAL).json(error)
        }
    }

    listChapter = async(req: Request, res: Response) => {
        try {
            const { mangaId } = req.body
            const chapter: any = await this.getListChapter(mangaId)

            return res.status(STATUS.OK).json({
                status: STATUS.OK,
                data: chapter
            })
        } catch (error: any) {
            console.log(error);
            return res.status(STATUS.INTERNAL).json(error)
        }
    }

    getChapter = async(req: Request, res: Response) =>  {
        try {
            const { id } = req.params
            const getChapter: any = (await chapter(id)).data.data
            const mangaId: string = getChapter?.relationships.find((i: Relationship) => i.type === 'manga').id
            const mangaRes: any = (await manga(mangaId)).data.data

            const order = this.orderParams({ chapter: 'asc' }, {})
            const chapterRes: any = await this.getListChapter(mangaId, order)

            return res.status(STATUS.OK).json({
                status: STATUS.OK,
                data: {
                    getChapter,
                    manga: {
                        ...mangaRes,
                        chapter: chapterRes.data
                    }
                }
            })
        } catch (error: any) {
            console.log(error);
            return res.status(STATUS.INTERNAL).json(error)
        }
    }

    statistics = async(req: Request, res: Response) => {
        try {
            const { id } = req.params
            const result = (await statistics(id)).data
            return res.status(STATUS.OK).json({
                status: STATUS.OK,
                data: result
            })
        } catch (error: any) {
            console.log(error);
            return res.status(STATUS.INTERNAL).json(error)
        }
    }

    getChapterImages = async(req: Request, res: Response) => {
        try {
            const { id } = req.params
            const result = (await chapterImage(id)).data
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