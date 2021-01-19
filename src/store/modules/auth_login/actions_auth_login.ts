import {MutationsT, STORE_MUTATIONS} from "@/store/mutations";
import {MUTATIONS_AUTHORIZATION, MutationsAuthorization} from "@/store/modules/auth_login/mutations_auth_login";
import {ActionContext, ActionTree} from "vuex";
import {RootState, SignInParams} from "@/confirm/types";
import {AuthState} from "@/store/modules/auth_login/auth_login";
import {STORE_STATUS} from "@/store";
import {API_AUTH} from "@/api/api";

//Enums
export enum ACTIONS_AUTH {
    LOG_IN = 'LOG_IN',
    LOG_OUT = 'LOG_OUT',
}

//Types
type MergeMutationsT = MutationsAuthorization & MutationsT

export type AugmentedActionContext = {
    commit<K extends keyof MergeMutationsT>(
        key: K,
        payload: Parameters<MergeMutationsT[K]>[1],
        /* eslint-disable */
        {}?
    ): ReturnType<MergeMutationsT[K]>
} & Omit<ActionContext<AuthState, RootState>, 'commit'>

export interface ActionsAuthorization {
    [ACTIONS_AUTH.LOG_IN](
        {commit}: AugmentedActionContext,
        payload: SignInParams
    ): void
    [ACTIONS_AUTH.LOG_OUT](
        {commit}: AugmentedActionContext,
    ): void
}

export const actionsAuthorization: ActionTree<AuthState, RootState> & ActionsAuthorization = {
    async [ACTIONS_AUTH.LOG_IN]({commit}, payload){
        try {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.LOADING, {root: true})
            const receiveData = await API_AUTH.SignIn(payload)
            if (receiveData.resultCode === 0){
                commit(MUTATIONS_AUTHORIZATION.LOG_IN, {auth: true})
                commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.SUCCESS, {root: true})
            }else {
                if (receiveData.messages[0]) {
                    commit(STORE_MUTATIONS.SET_ERROR, receiveData.messages[0], {root: true})
                    setTimeout(() => {
                        commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
                    }, 5000)
                } else {
                    commit(STORE_MUTATIONS.SET_ERROR, 'Some errors', {root: true})
                    setTimeout(() => {
                        commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
                    }, 5000)
                }
            }
        } catch (error){
            if (error.messages.length) {
                commit(STORE_MUTATIONS.SET_ERROR, error.message, {root: true})
            } else {
                commit(STORE_MUTATIONS.SET_ERROR, 'Some error', {root: true})
            }
            setTimeout(() => {
                commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
            }, 5000)
        } finally {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.SUCCESS, {root: true})
        }
    },
    async [ACTIONS_AUTH.LOG_OUT]({commit}){
        try {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.LOADING, {root: true})
            const receiveData = await API_AUTH.SignOut()
            if (receiveData.resultCode === 0){
                commit(MUTATIONS_AUTHORIZATION.LOG_OUT, {auth: false})
                commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.SUCCESS, {root: true})
            }else {
                if (receiveData.messages[0]) {
                    commit(STORE_MUTATIONS.SET_ERROR, receiveData.messages[0], {root: true})
                    setTimeout(() => {
                        commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
                    }, 5000)
                } else {
                    commit(STORE_MUTATIONS.SET_ERROR, 'Some errors', {root: true})
                    setTimeout(() => {
                        commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
                    }, 5000)
                }
            }
        } catch (error){
            if (error.messages.length) {
                commit(STORE_MUTATIONS.SET_ERROR, error.message, {root: true})
            } else {
                commit(STORE_MUTATIONS.SET_ERROR, 'Some error', {root: true})
            }
            setTimeout(() => {
                commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
            }, 5000)
        } finally {
            commit(STORE_MUTATIONS.SET_STATUS, STORE_STATUS.SUCCESS, {root: true})
        }
    }
}
