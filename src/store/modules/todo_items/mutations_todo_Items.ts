import {ItemsStateT} from "@/store/modules/todo_items/todo_Items";
import {MutationTree} from "vuex";
import {Item} from "@/api/api";


//Enums
export enum MUTATIONS_TODO_ITEMS {
    SET_ITEMS = 'SET_ITEMS',
}

//Types
export type MutationsTodoItems<I = ItemsStateT> = {
    [MUTATIONS_TODO_ITEMS.SET_ITEMS](state: I, payload: {todoListId: string, items: Array<Item>}): void
}

export const mutationsItems: MutationTree<ItemsStateT> & MutationsTodoItems = {
    [MUTATIONS_TODO_ITEMS.SET_ITEMS](state, payload){
        state.items[payload.todoListId] = payload.items.map(i => {
            return {...i, requestStatus: 'idle'}
        })
    },
}