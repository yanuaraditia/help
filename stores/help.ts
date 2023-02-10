import {defineStore} from "pinia";
import type {Help, Helps} from "~/types";
import {Strapi4ResponseData, Strapi4ResponseSingle} from "@nuxtjs/strapi/dist/runtime/types";

interface State {
    help?: Object,
    filteredHelps?: Object
}

export const useHelpStore = defineStore('helpStore', {
    state: () => {
        return {
            help: null as Strapi4ResponseData<any> | null,
            filteredHelps: undefined as Strapi4ResponseData<any>[] | undefined
        }
    },
    getters: {
        getHelp: state => state.help,
        getFilteredHelps: state => state.filteredHelps
    },
    actions: {
        async fetchHelps(categorySlug?: string | string[]) {
            const {find} = useStrapi()

            try {
                const {data: helps} = await find('helps',{
                    filters: {
                        help_category: {
                            slug: {
                                $eq: categorySlug
                            }
                        }
                    }
                })
                this.filteredHelps = helps
            } catch (e) {

            }
        },
        async fetchHelp(slug: string | string[]) {
            const {find} = useStrapi()

            try {
                const {data: helps} = await find('helps',{
                    filters: {
                        slug: {
                            $eq: slug
                        }
                    }
                })
                helps.forEach((value: Strapi4ResponseData<any>, key) => {
                    if(value.attributes.slug == slug) {
                        this.help = value
                    }
                })
            } catch (e) {

            }
        }
    }
})
