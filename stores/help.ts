import {acceptHMRUpdate, defineStore} from "pinia";
import {FilteredHelpsInterface, HelpStateInterface} from "~/types/state";

interface State {
    help?: Object,
    filteredHelps?: Object
}

const filterArray = (array: any[], id: string | string[]) => {
    for (const closure of array) {
        if (closure.id === id) {
            return closure
        }
    }
    return null
}

export const useHelpStore = defineStore('helpStore', {
    state: () => ({
        help: null,
        filteredHelpCache: [],
        filteredHelps: []
    } as HelpStateInterface),
    getters: {
        getHelp(state) {
            return state.help
        },
        getFilteredHelps(state) {
            return state.filteredHelps
        }
    },
    actions: {
        async fetchHelps(categoryId: string | string[]) {
            this.filteredHelps = []
            let loop: boolean = true
            if (loop) {
                try {
                    const {$client} = useNuxtApp()
                    await Promise.all([
                        $client.getEntries({
                            content_type: "entry",
                            order: '-sys.createdAt',
                            "fields.category.sys.id": {
                                all: categoryId
                            }
                        })
                    ]).then(([blogs]) => {
                        if (blogs.items.length > 0) {
                            let cache = {
                                id: categoryId,
                                helps: blogs.items
                            } as FilteredHelpsInterface
                            // @ts-ignore
                            this.filteredHelpCache.push(cache)
                            this.filteredHelps = blogs.items
                        }
                    })
                } catch (e) {
                    console.log(e)
                }
            }
            return this.filteredHelps
        },
        async fetchHelp(slug: string | string[]) {
            try {
                const {$client} = useNuxtApp()
                await Promise.all([
                    $client.getEntries({
                        content_type: "entry",
                        limit: 1,
                        order: '-sys.createdAt',
                        "fields.slug[all]": slug
                    })
                ]).then(([res]) => {
                    this.help = res.items[0] as any
                })
            } catch (e) {
                console.log(e)
            }
            return this.help
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(useHelpStore, import.meta.hot)
    )
}
