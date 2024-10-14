

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
    relationships: Array<Relationship> 
}
