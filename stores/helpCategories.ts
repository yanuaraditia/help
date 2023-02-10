import {defineStore} from "pinia";
import {HelpCategories} from "~/types";

export const useStore = defineStore('helpCategory',
    {
        state: () => ({
            categories: [],
            selectedCategory: null
        }),
        getters: {
            getCategories: state => state.categories,
        },
        actions: {
            async fetchCategories() {
                if (this.categories.length === 0) {
                    try {
                        const {find} = useStrapi()
                        const {data: categories} = await find<HelpCategories>('help-categories',{
                            populate: "*"
                        })
                        // @ts-ignore
                        this.categories = categories
                    } catch (e) {

                    }
                }
            }
        }
    })
