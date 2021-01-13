import {ItemMain, ItemsStateT} from "@/store/modules/todo_items/todo_Items";
import {MutationTree} from "vuex";
import {Item, ItemStatuses} from "@/api/api";
import {StatusT} from "@/store";


//Enums
export enum MUTATIONS_TODO_ITEMS {
    SET_ITEMS = 'SET_ITEMS',
    CHANGE_STATUS_I = 'CHANGE_STATUS_I',
    DELETE_I = 'DELETE_I',
    RENAME_TITLE_I = 'RENAME_TITLE_I',
    CHANGE_REQUEST_STATUS_I = 'CHANGE_REQUEST_STATUS_I',
    ADD_NEW_I = 'ADD_NEW_I'
}

//Types
export type MutationsTodoItems<I = ItemsStateT> = {
    [MUTATIONS_TODO_ITEMS.SET_ITEMS](state: I, payload: {
        todoListId: string, items: Array<Item>
    }): void
    [MUTATIONS_TODO_ITEMS.CHANGE_STATUS_I](state: I, payload: {
        todoListId: string, itemId: string, status: ItemStatuses
    }): void
    [MUTATIONS_TODO_ITEMS.RENAME_TITLE_I](state: I, payload: {
        todoListId: string, itemId: string, title: string
    }): void
    [MUTATIONS_TODO_ITEMS.DELETE_I](state: I, payload: {
        todoListId: string, itemId: string
    }): void
    [MUTATIONS_TODO_ITEMS.CHANGE_REQUEST_STATUS_I](state: I, payload: {
        todoListId: string, itemId: string, requestStatus: StatusT
    }): void
    [MUTATIONS_TODO_ITEMS.ADD_NEW_I](state: I, payload: {
        todoListId: string, item: Item
    }): void
}

export const mutationsItems: MutationTree<ItemsStateT> & MutationsTodoItems = {
    [MUTATIONS_TODO_ITEMS.SET_ITEMS](state, payload){
        state.items[payload.todoListId] = payload.items.map(i => {
            return {...i, requestStatus: 'idle'}
        })
    },
    [MUTATIONS_TODO_ITEMS.CHANGE_STATUS_I](state, payload){
        state.items[payload.todoListId] = [...state.items[payload.todoListId].map(i => {
         return i.id !== payload.itemId ? i : {...i, status: payload.status}
        })]
    },
    [MUTATIONS_TODO_ITEMS.RENAME_TITLE_I](state, payload){
        state.items[payload.todoListId] = [...state.items[payload.todoListId].map(i => {
            return i.id !== payload.itemId ? i : {...i, title: payload.title}
        })]
    },
    [MUTATIONS_TODO_ITEMS.DELETE_I](state, payload){
        state.items[payload.todoListId].forEach((i, index, object) => {
            if (i.id === payload.itemId) {
                object.splice(index, 1)
            }
        })
    },
    [MUTATIONS_TODO_ITEMS.CHANGE_REQUEST_STATUS_I](state, payload){
        state.items[payload.todoListId] = [
            ...state.items[payload.todoListId].map(i => {
                return i.id !== payload.itemId ? i : {...i, requestStatus: payload.requestStatus}
            })
        ]
    },
    [MUTATIONS_TODO_ITEMS.ADD_NEW_I](state, payload){
        const item: ItemMain = {...payload.item, requestStatus: 'idle'}
        state.items[payload.todoListId] = [item, ...state.items[payload.todoListId]]
    }

}