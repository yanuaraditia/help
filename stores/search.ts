import {acceptHMRUpdate, defineStore} from "pinia";
import {ResultStructure} from "~/types";
import {useCategoryStore} from "~/stores/helpCategories";

interface StateStructure {
    results?: ResultStructure[],
    showModal: boolean,
    isLoading: boolean
}

export const useSearchStore = defineStore('searchStore', {
    state: () => ({
        results: [],
        showModal: false,
        isLoading: false
    } as StateStructure),
    getters: {
        getResults: state => state.results,
        isModalShow: state => state.showModal
    },
    actions: {
        toggleModal(forceModal: boolean = false, forceModalValue: boolean = false) {
            this.showModal = forceModal ? forceModalValue : !this.showModal
        },
        setLoading(as: boolean = true) {
            this.isLoading = as
        },
        async searchData(query: string) {
            this.results = []
            const {$client} = useNuxtApp()
            await Promise.all([
                $client.getEntries({
                    content_type: "entry",
                    limit: 5,
                    order: '-sys.createdAt',
                    query: query
                })
            ]).then(([res]) => {
                for (const item of res.items) {
                    let object = {
                        to: `/article/${item.fields.slug}`,
                        label: item.fields.title,
                        content: item.fields.description
                    } as ResultStructure

                    this.results?.push(object)
                }
                this.isLoading = false
            })
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(useCategoryStore, import.meta.hot)
    )
}
