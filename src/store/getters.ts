import {GetterTree} from "vuex";
import {StoreState, StatusT} from "@/store/index";

//Types
export interface Getters {
    status(state: StoreState): StatusT
    error(state: StoreState): string | null
}

export const getters: GetterTree<StoreState, StoreState> & Getters = {
    status: (state) => {
        return state.status
    },
    error(state) {
        return state.error
    }
}