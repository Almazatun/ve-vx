import {MUTATIONS_TODO_LISTS, MutationsTodoListsT} from "@/store/modules/todo_lists/mutations_todo_lists";
import {MutationsT, STORE_MUTATIONS} from "@/store/mutations";
import {STORE_STATUS} from "@/store";
import {API_TODO_LISTS} from "@/api/api";
import {ActionContext, ActionTree} from "vuex";
import {TodoListsStateT} from "@/store/modules/todo_lists/todo_lists";
import {RootState} from "@/confirm/types";

//Enums
export enum ACTIONS_TODO_LISTS {
    FETCH_TLS = 'FETCH_TLS',
    REMOVE_TL = 'REMOVE_TL',
    CHANGE_TL_TITLE = 'CHANGE_TL_TITLE'
}

//Types
type MergeMutationsT = MutationsTodoListsT & MutationsT

type AugmentedTLSActionContext = {
    commit<K extends keyof MergeMutationsT>(
        key: K,
        payload: Parameters<MergeMutationsT[K]>[1],
        /* eslint-disable */
        {}?
    ): ReturnType<MergeMutationsT[K]>
} & Omit<ActionContext<TodoListsStateT, RootState>, 'commit'>


export interface ActionsTodoLists {
    [ACTIONS_TODO_LISTS.FETCH_TLS](
        {commit}: AugmentedTLSActionContext,
        payload: TodoListsStateT
    ): void
}

export const actionsTodoLists: ActionTree<TodoListsStateT, RootState> & ActionsTodoLists = {
    async [ACTIONS_TODO_LISTS.FETCH_TLS]({commit}) {
        try {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.LOADING, {root: true})
            const receiveTodoLists = await API_TODO_LISTS.getTodoLists()
            commit(MUTATIONS_TODO_LISTS.SET_TLS, {todoLists: receiveTodoLists})
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