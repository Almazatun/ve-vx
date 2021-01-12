import {ItemMain, ItemsStateT} from "@/store/modules/todo_items/todo_Items";
import {GetterTree} from "vuex";
import {RootState} from "@/confirm/types";

//Types
export interface GettersTodoItems {
    todoItems: (state: ItemsStateT) => (todoListId: string) => Array<ItemMain>
}

export const gettersItems: GetterTree<ItemsStateT, RootState> & GettersTodoItems = {
    todoItems: (state) => (todoListId) => {
        return state.items[todoListId]
    },
}