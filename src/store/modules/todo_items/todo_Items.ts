import {Item} from "@/api/api";
import {StatusT} from "@/store";
import {mutationsItems} from "@/store/modules/todo_items/mutations_todo_Items";
import {actionsItems} from "@/store/modules/todo_items/actions_todo_Items";
import {gettersItems} from "@/store/modules/todo_items/getters_todo_Items";

//types
export interface ItemsStateT {
    items: {
        [key: string]: Array<ItemMain>
    }
}

export interface ItemMain extends Item {
    requestStatus: StatusT
}

const ItemsState: ItemsStateT = {
    items: {}
}

export const moduleItems = {
    namespaced: true,
    state: ItemsState,
    mutations: mutationsItems,
    actions: actionsItems,
    getters: gettersItems,
}