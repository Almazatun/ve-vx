import {createStore} from "vuex";
import {mutations} from "@/store/mutations";
import {actions} from "@/store/actions";
import {getters} from "@/store/getters";

//Types
export interface StoreState {
    status: StatusT
    error: string | null
}

export type StatusT = 'idle' | 'loading' | 'success' | 'failed'

//Enums
export enum STORE_STATUS {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCESS = 'success',
    FAILED = 'failed'
}


const state: StoreState = {
    status: 'idle',
    error: null,
}

export const store = createStore({
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
    modules: {}
});

