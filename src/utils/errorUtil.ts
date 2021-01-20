import {STORE_MUTATIONS} from "@/store/mutations";

export function ErrorUtil <C>(errors: string, commit: C | any): void {
    if (errors){
        commit(STORE_MUTATIONS.SET_ERROR, errors, {root: true})
        setTimeout(() => {
            commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
        }, 5000)
    }else {
        commit(STORE_MUTATIONS.SET_ERROR, 'Some errors', {root: true})
        setTimeout(() => {
            commit(STORE_MUTATIONS.SET_ERROR, '', {root: true})
        }, 5000)
    }
}