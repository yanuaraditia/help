import {acceptHMRUpdate, defineStore} from "pinia";

interface PlatformState {
    forceWebView: boolean
}
export const usePlatformStore = defineStore('platformStore', {
    state: () => ({
        forceWebView: false
    } as PlatformState),
    getters: {
        isWebView: state => state.forceWebView
    },
    actions: {
        setWebView(condition: boolean) {
            this.forceWebView = condition
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(usePlatformStore, import.meta.hot)
    )
}
