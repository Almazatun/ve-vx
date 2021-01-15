import {AuthState} from "@/store/modules/auth_login/auth_login";
import {MutationTree} from "vuex";

//Enums
export enum MUTATIONS_AUTHORIZATION {
    LOG_IN = 'LOG_IN',
    LOG_OUT = 'LOG_OUT'
}

//Types
export interface MutationsAuthorization <A = AuthState> {
    [MUTATIONS_AUTHORIZATION.LOG_IN](state: A, payload: {
        auth: boolean
    }): void
    [MUTATIONS_AUTHORIZATION.LOG_OUT](state: A, payload:{
        auth: boolean
    }): void
}


export const mutationsAuthorization: MutationTree<AuthState> & MutationsAuthorization = {
    [MUTATIONS_AUTHORIZATION.LOG_IN](state, payload){
        state.isAuth = payload.auth
    },
    [MUTATIONS_AUTHORIZATION.LOG_OUT](state, payload){
        state.isAuth = payload.auth
    }
}
