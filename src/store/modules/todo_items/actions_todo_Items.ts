import {MUTATIONS_TODO_ITEMS, MutationsTodoItems} from "@/store/modules/todo_items/mutations_todo_Items";
import {MutationsT, STORE_MUTATIONS} from "@/store/mutations";
import {ActionContext, ActionTree} from "vuex";
import {RootState} from "@/confirm/types";
import {ItemsStateT} from "@/store/modules/todo_items/todo_Items";
import {STORE_STATUS} from "@/store";
import {API_ITEMS} from "@/api/api";


//Enums
export enum ACTIONS_TODO_ITEMS {
    FETCH_I = 'FETCH_I'
}

//Types
type MergeMutationsT = MutationsTodoItems & MutationsT

type AugmentedActionContext = {
    commit<K extends keyof MergeMutationsT>(
        key: K,
        payload: Parameters<MergeMutationsT[K]>[1],
        /* eslint-disable */
        {}?
    ): ReturnType<MergeMutationsT[K]>
} & Omit<ActionContext<ItemsStateT, RootState>, 'commit'>

export interface ActionsTodoItems {
    [ACTIONS_TODO_ITEMS.FETCH_I](
        {commit}: AugmentedActionContext,
        payload: {type: string, todoListId: string}
    ): void
}

export const actionsItems: ActionTree<ItemsStateT, RootState> & ActionsTodoItems = {
    async [ACTIONS_TODO_ITEMS.FETCH_I]({commit}, payload) {
        const {todoListId} = payload
        try {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.LOADING, {root: true})
            const receiveData = await API_ITEMS.getItemsOfTheList(todoListId)
            commit(MUTATIONS_TODO_ITEMS.SET_ITEMS, {todoListId, items: receiveData.items})
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.SUCCESS, {root: true})
        } catch (error) {
            if (error.messages.length) {
                commit(STORE_MUTATIONS.SET_ERROR, error.message)
            } else {
                commit(STORE_MUTATIONS.SET_ERROR, 'Some error')
            }
        }
    }
}