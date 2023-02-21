import {useCategoryStore} from "~/stores/helpCategories";
import {HelpCategory} from "~/types";

export const fetchAll = async () => {
    const {fetchCategories} = useCategoryStore()
    return fetchCategories()
}

export const fetch = async (slug?: string | string[]) => {
    let category = {} as HelpCategory
    const {fetchCategories} = useCategoryStore()
    const categories = await fetchCategories()
    for (const value of categories) {
        if (value.fields.slug === slug) {
            category = value
        }
    }
    if (category.fields === undefined) {
        throw createError({
            statusCode: 404,
            statusMessage: "Not Found"
        })
    }
    return category
}
