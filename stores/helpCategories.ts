import {acceptHMRUpdate, defineStore} from "pinia";
import {CategoryStateInterface} from "~/types/state";

export const useCategoryStore = defineStore('helpCategory',
    {
        state: () => ({
            categories: [],
            selectedCategory: null
        } as CategoryStateInterface),
        getters: {
            getCategories: state => state.categories,
            getSelected: state => state.selectedCategory
        },
        actions: {
            async fetchCategories() {
                if (this.categories?.length === 0) {
                    try {
                        const {$client} = useNuxtApp()
                        await Promise.all([
                            $client.getEntries({
                                content_type: "category",
                            })
                        ]).then(([blogs]) => {
                            this.categories = blogs.items
                        })
                    } catch (e) {
                        console.log(e)
                    }
                }
                return this.categories
            }
        }
    })


if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(useCategoryStore, import.meta.hot)
    )
}
