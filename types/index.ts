
interface HelpCategoryPopulate {
    data?: HelpCategory
}

export interface HelpCategory {
    id?: bigint,
    attributes: {
        slug?: string,
        description?: string,
        createdAt?: string,
        publishedAt?: string,
        updatedAt?: string,
        image_svg?: string,
        title?: string
    }
}

export interface Help {
    id?: bigint,
    attributes: {
        slug?: string,
        description?: string,
        content?: string,
        createdAt?: string,
        publishedAt?: string,
        updatedAt?: string,
        help_category?: HelpCategoryPopulate,
        title?: string,
        image?: Object
    }
}

export interface Helps {
    data?: Help[]
}

export interface HelpCategories {
    data?: HelpCategory[]
}
