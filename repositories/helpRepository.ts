import {useHelpStore} from "~/stores/help";

export const fetchAll = async (categoryId?: string | string[]) => {
    if (categoryId) {
        const {fetchHelps} = useHelpStore()
        return fetchHelps(categoryId)
    } else {
        return {}
    }
}

export const fetchSingle = async (slug: string | string[]) => {
    const {fetchHelp} = useHelpStore()
    return await fetchHelp(slug)
}
