import {Help, HelpCategory} from "~/types/index";

export interface CategoryStateInterface {
    categories: HelpCategory[],
    selectedCategory?: any | null
}

export interface FilteredHelpsInterface {
    id?: string,
    helps?: any[]
}

export interface HelpStateInterface {
    help?: Help | null,
    filteredHelpCache: FilteredHelpsInterface[] | any[] | []
    filteredHelps: any[]
}
