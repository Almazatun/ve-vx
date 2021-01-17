import {GetterTree} from "vuex";
import {RootState} from "@/confirm/types";
import {AuthState} from "@/store/modules/auth_login/auth_login";


//Types
export interface GettersAuthorization {
    isAuth (state: AuthState): boolean
}

export const gettersAuth: GetterTree<AuthState, RootState> & GettersAuthorization = {
    isAuth (state) {
        return state.isAuth
    }
}