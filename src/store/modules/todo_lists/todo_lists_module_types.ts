import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";
import {TodoListsStateT} from "@/store/modules/todo_lists/todo_lists";
import {MutationsTodoListsT} from "@/store/modules/todo_lists/mutations_todo_lists";
import {GettersTodoLists} from "@/store/modules/todo_lists/getters_todo_lists";
import {ActionsTodoLists} from "@/store/modules/todo_lists/actions_todo_lists";

export type TodoListsStoreModuleTypes<S = TodoListsStateT> = Omit<
    VuexStore<S>,
    "commit" | "getters" | "dispatch"
    > & {
    commit<
        K extends keyof MutationsTodoListsT,
        P extends Parameters<MutationsTodoListsT[K]>[1]
        >(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<MutationsTodoListsT[K]>;
} & {
    getters: {
        [K in keyof GettersTodoLists]: ReturnType<GettersTodoLists[K]>;
    };
} & {
    dispatch<K extends keyof ActionsTodoLists>(
        key: K,
        payload?: Parameters<ActionsTodoLists[K]>[1],
        options?: DispatchOptions
    ): ReturnType<ActionsTodoLists[K]>;
};