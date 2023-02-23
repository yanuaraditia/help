import {ResultStructure} from "~/types";

export class SearchHandlerService {
    public static keyword = ref("")
    public static results = ref([] as ResultStructure[])

    constructor() {
    }
}
