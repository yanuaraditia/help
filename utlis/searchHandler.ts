import {ResultStructure} from "~/types";
import {Ref} from '@vue/reactivity';
import {useSearchStore} from "~/stores/search";

/**
 * SHOW MODAL HANDLER
 * @param isShowRef
 * @param forceModal
 * @param forceModalValue
 */
export const showModal = (isShowRef: Ref, forceModal?: boolean, forceModalValue?: boolean) => {
    const {toggleModal, isModalShow} = useSearchStore()
    toggleModal(forceModal, forceModalValue)
    isShowRef.value = isModalShow
    disableBody(document.body, isShowRef)
}

/**
 * KEYBOARD HANDLER
 * @param event
 * @param isShowRef
 */
export const keyboardHandler = (event: KeyboardEvent, isShowRef: Ref) => {
    const esc = event.key == 'Escape'
    const open = event.ctrlKey && event.key == 'k'
    if (isShowRef.value && esc) {
        showModal(isShowRef, true, false)
    }
    if (open) {
        showModal(isShowRef)
    }
}

/**
 * DISABLE SRCOLL
 * @param element: Element
 * @param isModalShow: Ref
 * @return void
 */
export const disableBody = (element: Element, isModalShow: Ref): void => {
    if (isModalShow.value) {
        element.classList.add('overflow-hidden')
    } else {
        element.classList.remove('overflow-hidden')
    }
}

/**
 * SEARCH HANDLER
 * @param keyword
 * @param results
 * @param isLoading
 */
export const searchHandler = async (keyword: Ref, results: Ref, isLoading: Ref) => {
    isLoading.value = true
    const {searchData, getResults} = useSearchStore()
    if (keyword.value.length >= 2) {
        await Promise.all([
            searchData(keyword.value)
        ])
        results.value = getResults as ResultStructure[]
        isLoading.value = false
    }
}

/**
 * MOUNTED AND DOCUMENT
 * @param keywordRef
 * @param resultsRef
 * @param isShowRef
 * @param isLoading
 */
export const useMount = (keywordRef: Ref, resultsRef: Ref, isShowRef: Ref, isLoading: Ref) => {
    watch(() => keywordRef.value, () => searchHandler(keywordRef, resultsRef, isLoading))
    onMounted(() => {
        document.addEventListener('keyup', (event: KeyboardEvent) => keyboardHandler(event, isShowRef))
    })
}
