import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";
import {ItemsStateT} from "@/store/modules/todo_items/todo_Items";
import {MutationsTodoItems} from "@/store/modules/todo_items/mutations_todo_Items";
import {GettersTodoItems} from "@/store/modules/todo_items/getters_todo_Items";
import {ActionsTodoItems} from "@/store/modules/todo_items/actions_todo_Items";

export type ItemsStoreModuleTypes<S = ItemsStateT> = Omit<
    VuexStore<S>,
    "commit" | "getters" | "dispatch"
    > & {
    commit<
        K extends keyof MutationsTodoItems,
        P extends Parameters<MutationsTodoItems[K]>[1]
        >(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<MutationsTodoItems[K]>;
} & {
    getters: {
        [K in keyof GettersTodoItems]: ReturnType<GettersTodoItems[K]>;
    };
} & {
    dispatch<K extends keyof ActionsTodoItems>(
        key: K,
        payload?: Parameters<ActionsTodoItems[K]>[1],
        options?: DispatchOptions
    ): ReturnType<ActionsTodoItems[K]>;
};