import {useHelpStore} from "~/stores/help";

export const fetchAll = async (categoryId: string | string[]) => {
    const {fetchHelps} = useHelpStore()
    return fetchHelps(categoryId)
}

export const fetch = async (slug: string | string[]) => {
    const {fetchHelp} = useHelpStore()
    return fetchHelp(slug)
}
