
export interface Language {
    en: string,
    vi: string
} 

export interface Tag {
    id: string,
    type: string,
    attributes: {
        name: Language,
        description: Language,
        group: string
    }
}

export interface Relationship {
    id: string,
    type: string
}

export interface Attributes {
    title: Language,
    description: Language,
    lastChapter: string,
    status: string,
    year: number,
    tags: Array<Tag>,
    createdAt: string,
    updatedAt: string
}

export interface Manga {
    id: string,
    type: string,
    attributes: Attributes,
    relationships: Array<Relationship>,
    coverUrl: string,
    chapter: Array<Chapter>,
    author: Author,
    mangaByAuthor: Array<MangaLatestResult>
}

export interface MangaLatestResult {
    id: string,
    title: Language,
    lastChapter: string | null,
    updatedAt: string,
    coversUrl: string
}

export interface AttributesChapter {
    chapter: string,
    title: string,
    translatedLanguage: string,
    pages: number,
    updatedAt: string
}

export interface Chapter {
    id: string,
    type: string,
    attributes: AttributesChapter
}

export interface ChapterBody {
    mangaId: string
}

export interface Author{
    data: {
        id: string,
        type: string,
        attributes: {
            name: string,
        },
        relationships: Array<Relationship>
    }
}

export interface Statistics {
    statistics: {
        [key: string]: {
            follows: number,
            rating: any
        }
    }
}

export interface ChapterImage {
    baseUrl: string,
    chapter: {
        hash: string,
        data: Array<string>,
        dataServer: Array<string>
    }
}