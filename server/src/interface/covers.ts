

export interface Cover {
    id: string,
    type: string,
    attributes: {
        fileName: string
    }
}

export interface ResultCovers {
    fileName: string,
    mangaId: string
}

export interface CoversArtRes {
    mangaId: string,
    coversUrl: string
}