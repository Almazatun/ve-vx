import {createStore, ModuleTree} from "vuex";
import {mutations} from "./mutations";
import {actions} from "./actions";
import {getters} from "./getters";
import {moduleTodoLists} from "./modules/todo_lists/todo_lists";
import {RootState} from "@/confirm/types";

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

// Modules
const modules: ModuleTree<RootState> = {
    TLS: moduleTodoLists,
};

export const store = createStore({
    strict: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
    modules: modules
});

