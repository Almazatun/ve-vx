import {Item} from "@/api/api";

//types
interface ItemsStateT {
    items: {
        [key: string]: Array<Item>
    }
}

const ItemsState: ItemsStateT = {
    items: {}
}

export const moduleItems = {
    namespaced: true,
    state: ItemsState,
    mutations: {},
    actions: {},
    getters: {},
}