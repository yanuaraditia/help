import {useStore} from "~/stores/helpCategories";
import {HelpCategory} from "~/types";

export const fetchAll = async () => {
    const store = useStore()
    await store.fetchCategories()

    return store.getCategories
}

export const fetch = async (slug: string | string[]) => {
    let category = {} as HelpCategory
    const categories = await fetchAll()
    categories.forEach((value: HelpCategory, key) => {
        if (value.attributes.slug === slug) {
            category = value
        }
    })
    return category
}
