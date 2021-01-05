import {MutationTree} from "vuex";
import {StoreState, StatusT} from "@/store/index";

//Enums
export enum STORE_MUTATIONS {
    SET_STATUS = 'SET_STATUS',
    SET_ERROR = 'SET_ERROR'
}

//Types
export type MutationsT<S = StoreState> = {
    [STORE_MUTATIONS.SET_STATUS](state: S, payload: StatusT): void
    [STORE_MUTATIONS.SET_ERROR](state: S, payload: string): void
}


export const mutations: MutationTree<StoreState> & MutationsT = {
    [STORE_MUTATIONS.SET_STATUS](state, payload) {
        state.status = payload
    },
    [STORE_MUTATIONS.SET_ERROR](state, payload) {
        state.error = payload
    }
}