import {mutationsAuthorization} from "@/store/modules/auth_login/mutations_auth_login";
import {actionsAuthorization} from "@/store/modules/auth_login/actions_auth_login";

//Types
export interface AuthState {
    isAuth: boolean
}

const authState = {
    isAuth: false
} as AuthState

export const moduleAuth = {
    namespaced: true,
    state: authState,
    mutations: mutationsAuthorization,
    actions: actionsAuthorization,
}