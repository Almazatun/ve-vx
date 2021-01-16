import {AuthState} from "@/store/modules/auth_login/auth_login";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";
import {MutationsAuthorization} from "@/store/modules/auth_login/mutations_auth_login";
import {ActionsAuthorization} from "@/store/modules/auth_login/actions_auth_login";

export type AuthStoreModuleTypes<S = AuthState> = Omit<
    VuexStore<S>,
    "commit" | "getters" | "dispatch"
    > & {
    commit<
        K extends keyof MutationsAuthorization,
        P extends Parameters<MutationsAuthorization[K]>[1]
        >(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<MutationsAuthorization[K]>;
}  & {
    dispatch<K extends keyof ActionsAuthorization>(
        key: K,
        payload?: Parameters<ActionsAuthorization[K]>[1],
        options?: DispatchOptions
    ): ReturnType<ActionsAuthorization[K]>;
};