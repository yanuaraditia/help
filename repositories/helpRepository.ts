import {useHelpStore} from "~/stores/help";
import {Help} from "~/types";

export const fetchAll = async (categorySlug?: string | string[]) => {
    const storeHelps = useHelpStore()
    await storeHelps.fetchHelps(categorySlug)

    return storeHelps.getFilteredHelps
}

export const fetch = async (slug: string | string[]) => {
    const storeHelps = useHelpStore()
    await storeHelps.fetchHelp(slug)
    let help = storeHelps.getHelp
    if (!help) {
        throw createError({
            statusCode: 404,
            statusMessage: "Artikel tidak ditemukan"
        })
    }
    return storeHelps.getHelp
}
