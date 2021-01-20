import {MUTATIONS_TODO_LISTS, MutationsTodoListsT} from "@/store/modules/todo_lists/mutations_todo_lists";
import {MutationsT, STORE_MUTATIONS} from "@/store/mutations";
import {STORE_STATUS} from "@/store";
import {API_TODO_LISTS} from "@/api/api";
import {ActionContext, ActionTree} from "vuex";
import {TodoListsStateT, TodoList} from "@/store/modules/todo_lists/todo_lists";
import {RootState} from "@/confirm/types";
import {ErrorUtil} from "@/utils/errorUtil";

//Enums
export enum ACTIONS_TODO_LISTS {
    FETCH_TLS = 'FETCH_TLS',
    REMOVE_TL = 'REMOVE_TL',
    CHANGE_TL_TITLE = 'CHANGE_TL_TITLE',
    CREATE_TL = 'CREATE_TL'
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

    [ACTIONS_TODO_LISTS.CREATE_TL](
        {commit}: AugmentedTLSActionContext,
        payload: { title: string }
    ): void

    [ACTIONS_TODO_LISTS.REMOVE_TL](
        {commit}: AugmentedTLSActionContext,
        payload: { todoListId: string }
    ): void

    [ACTIONS_TODO_LISTS.CHANGE_TL_TITLE](
        {commit}: AugmentedTLSActionContext,
        payload: { todoListId: string, title: string }
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
    },
    async [ACTIONS_TODO_LISTS.CREATE_TL]({commit}, payload) {
        const data: { title: string } = {title: payload.title}
        try {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.LOADING, {root: true})
            //disable
            const receiveData = await API_TODO_LISTS.createTodoList(data)
            if (receiveData.resultCode === 0) {
                const newData: { newTodoList: TodoList } = {
                    newTodoList: {
                        ...receiveData.data.item,
                        requestStatus: "idle"
                    }
                }
                commit(MUTATIONS_TODO_LISTS.ADD_TL, newData)
                commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.SUCCESS, {root: true})
                //un-disable
            } else {
                ErrorUtil<AugmentedTLSActionContext>(receiveData.messages[0], commit)
            }
        } catch (error) {
            if (error.messages.length) {
                commit(STORE_MUTATIONS.SET_ERROR, error.message, {root: true})
            } else {
                commit(STORE_MUTATIONS.SET_ERROR, 'Some error', {root: true})
            }
            setTimeout(() => {
                commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
            }, 5000)
        } finally {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.SUCCESS, {root: true})
        }
    },
    async [ACTIONS_TODO_LISTS.REMOVE_TL]({commit}, payload) {
        try {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.LOADING, {root: true})
            //disable
            const receiveData = await API_TODO_LISTS.deleteTodoList(payload.todoListId)
            if (receiveData.resultCode === 0) {
                commit(MUTATIONS_TODO_LISTS.REMOVE_TL, {todoListId: payload.todoListId})
                commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.SUCCESS, {root: true})
                //un-disable
            } else {
                ErrorUtil<AugmentedTLSActionContext>(receiveData.messages[0], commit)
            }
        } catch (error) {
            if (error.messages.length) {
                commit(STORE_MUTATIONS.SET_ERROR, error.message, {root: true})
            } else {
                commit(STORE_MUTATIONS.SET_ERROR, 'Some error', {root: true})
            }
            setTimeout(() => {
                commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
            }, 5000)
        } finally {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.SUCCESS, {root: true})
        }
    },
    async [ACTIONS_TODO_LISTS.CHANGE_TL_TITLE]({commit}, payload) {
        try {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.LOADING, {root: true})
            //disable
            const receiveData = await API_TODO_LISTS.updateTodoList(payload.todoListId, {title: payload.title})
            if (receiveData.resultCode === 0) {
                commit(MUTATIONS_TODO_LISTS.CHANGE_TL_TITLE, {todoListId: payload.todoListId, title: payload.title})
                commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.SUCCESS, {root: true})
                //un-disable
            } else {
                ErrorUtil<AugmentedTLSActionContext>(receiveData.messages[0], commit)
            }
        } catch (error) {
            if (error.messages.length) {
                commit(STORE_MUTATIONS.SET_ERROR, error.message, {root: true})
            } else {
                commit(STORE_MUTATIONS.SET_ERROR, 'Some error', {root: true})
            }
            setTimeout(() => {
                commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
            }, 5000)
        } finally {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.SUCCESS, {root: true})
            //un-disable
        }
    }
}