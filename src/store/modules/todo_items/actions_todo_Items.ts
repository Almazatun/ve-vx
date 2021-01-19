import {MUTATIONS_TODO_ITEMS, MutationsTodoItems} from "@/store/modules/todo_items/mutations_todo_Items";
import {MutationsT, STORE_MUTATIONS} from "@/store/mutations";
import {ActionContext, ActionTree} from "vuex";
import {RootState} from "@/confirm/types";
import {ItemsStateT} from "@/store/modules/todo_items/todo_Items";
import {STORE_STATUS} from "@/store";
import {API_ITEMS, UpdateItemModel} from "@/api/api";


//Enums
export enum ACTIONS_TODO_ITEMS {
    FETCH_I = 'FETCH_I',
    DELETE_I = 'DELETE_I',
    CREATE_I = 'CREATE_I',
    UPDATE_PROPERTY_I = 'UPDATE_PROPERTY_I',
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
        payload: {
            type: string,
            todoListId: string
        }
    ): void

    [ACTIONS_TODO_ITEMS.DELETE_I](
        {commit}: AugmentedActionContext,
        payload: {
            type: string,
            todoListId: string,
            itemId: string
        }
    ): void

    [ACTIONS_TODO_ITEMS.CREATE_I](
        {commit}: AugmentedActionContext,
        payload: {
            type: string,
            todoListId: string,
            title: string
        }
    ): void

    [ACTIONS_TODO_ITEMS.UPDATE_PROPERTY_I](
        {commit}: AugmentedActionContext,
        payload: {
            type: string,
            todoListId: string,
            itemId: string,
            model: UpdateItemModel
        }
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
    },
    async [ACTIONS_TODO_ITEMS.DELETE_I]({commit}, payload) {
        const {todoListId, itemId} = payload
        try {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.LOADING, {root: true})
            //disable
            const receiveData = await API_ITEMS.deleteItemOfSpecialList(todoListId, itemId)
            if (receiveData.resultCode === 0) {
                commit(MUTATIONS_TODO_ITEMS.DELETE_I, {todoListId, itemId})
                commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.SUCCESS, {root: true})
                //un-disable
            } else {
                if (receiveData.messages[0] && receiveData.messages[0].length > 0) {
                    commit(STORE_MUTATIONS.SET_ERROR, receiveData.messages[0], {root: true})
                    setTimeout(() => {
                        commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
                    }, 5000)
                } else {
                    commit(STORE_MUTATIONS.SET_ERROR, 'Some errors', {root: true})
                    setTimeout(() => {
                        commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
                    }, 5000)
                }
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
    },
    async [ACTIONS_TODO_ITEMS.CREATE_I]({commit}, payload) {
        const {todoListId, title, type} = payload
        try {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.LOADING, {root: true})
            //disable
            const receiveData = await API_ITEMS.createItemOfSpecialList(todoListId, title)
            if (receiveData.resultCode === 0) {
                commit(MUTATIONS_TODO_ITEMS.ADD_NEW_I, {todoListId, item: receiveData.data.item})
                commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.SUCCESS, {root: true})
                //un-disable
            } else {
                if (receiveData.messages[0] && receiveData.messages[0].length > 0) {
                    commit(STORE_MUTATIONS.SET_ERROR, receiveData.messages[0], {root: true})
                    setTimeout(() => {
                        commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
                    }, 5000)
                } else {
                    commit(STORE_MUTATIONS.SET_ERROR, 'Some errors', {root: true})
                    setTimeout(() => {
                        commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
                    }, 5000)
                }
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
    },
    async [ACTIONS_TODO_ITEMS.UPDATE_PROPERTY_I]({commit, state}, payload) {
        const {itemId, todoListId, type, model} = payload

        const item = state.items[todoListId].find(el => {
            return el.id === itemId
        })

        if (!item) {
            console.error('Item not founded ❌')
            return;
        }

        const modelDataItem = {
            title: item.title,
            description: item.description,
            completed: false,
            status: item.status,
            priority: item.priority,
            startDate: item.startDate,
            deadline: item.deadline,
        }
        const modelAPI = {...modelDataItem, ...model}

        try {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.LOADING, {root: true})
            //disable
            const receiveData = await API_ITEMS.updateParticularDataOfSpecialList(todoListId, itemId, modelAPI)
            if (receiveData.resultCode === 0) {
                commit(MUTATIONS_TODO_ITEMS.UPDATE_PROPERTY_I, {todoListId, itemId, item: model})
                commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.SUCCESS, {root: true})
                //un-disable
            } else {
                if (receiveData.messages[0] && receiveData.messages[0].length > 0) {
                    commit(STORE_MUTATIONS.SET_ERROR, receiveData.messages[0], {root: true})
                    setTimeout(() => {
                        commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
                    }, 5000)
                } else {
                    commit(STORE_MUTATIONS.SET_ERROR, 'Some errors', {root: true})
                    setTimeout(() => {
                        commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
                    }, 5000)
                }
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