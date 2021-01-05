import {MutationsT, STORE_MUTATIONS} from "@/store/mutations";
import {ActionContext, ActionTree} from "vuex";
import {StoreState, StatusT} from "@/store/index";

//Enums
export enum STORE_ACTIONS {
    UPDATE_STATUS = 'UPDATE_STATUS',
    ERROR_STORE = 'ERROR_STORE'
}

export type AugmentedActionContext = {
    commit<K extends keyof MutationsT>(
        key: K,
        payload: Parameters<MutationsT[K]>[1]
    ): ReturnType<MutationsT[K]>
} & Omit<ActionContext<StoreState, StoreState>, 'commit'>

//Types
export interface Actions {
    [STORE_ACTIONS.UPDATE_STATUS](
        {commit}: AugmentedActionContext,
        payload: StatusT
    ): void

    [STORE_ACTIONS.ERROR_STORE](
        {commit}: AugmentedActionContext,
        payload: string
    ): void
}

export const actions: ActionTree<StoreState, StoreState> & Actions = {
    [STORE_ACTIONS.UPDATE_STATUS]({commit}, payload) {
        commit(STORE_MUTATIONS.SET_STATUS, payload)
    },
    [STORE_ACTIONS.ERROR_STORE]({commit}, payload) {
        commit(STORE_MUTATIONS.SET_ERROR, payload)
    }
}
