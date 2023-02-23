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
    disableBody(document.body)
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
 * @return void
 */
export const disableBody = (element: Element): void => {
    element.classList.toggle('overflow-hidden')
}

/**
 * SEARCH HANDLER
 * @param keyword
 * @param results
 */
export const searchHandler = async (keyword: Ref, results: Ref) => {
    const {searchData, getResults} = useSearchStore()
    if (keyword.value.length >= 3) {
        await searchData(keyword.value)
        results.value = getResults as ResultStructure[]
    }
}

/**
 * MOUNTED AND DOCUMENT
 * @param keywordRef
 * @param resultsRef
 * @param isShowRef
 */
export const useMount = (keywordRef: Ref, resultsRef: Ref, isShowRef: Ref) => {
    watch(() => keywordRef.value, () => searchHandler(keywordRef, resultsRef))
    onMounted(() => {
        document.addEventListener('keyup', (event: KeyboardEvent) => keyboardHandler(event, isShowRef))
    })
}
