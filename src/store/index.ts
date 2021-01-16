import {createStore, ModuleTree} from "vuex";
import {mutations} from "./mutations";
import {actions} from "./actions";
import {getters} from "./getters";
import {moduleTodoLists} from "./modules/todo_lists/todo_lists";
import {RootState} from "@/confirm/types";
import {moduleItems} from "@/store/modules/todo_items/todo_Items";
import {moduleAuth} from "@/store/modules/auth_login/auth_login";

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
    IMS: moduleItems,
    AUTH: moduleAuth
};

export const store = createStore({
    strict: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
    modules: modules
});

