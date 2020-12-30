import {StoreState, STORE_STATUS} from "@/store";
import {mutations} from "@/store/mutations";

let state: StoreState

beforeEach(() => {
    state = {
        status: "idle",
        error: null
    }
})

describe("Mutations of the store, index.ts", () => {
    it("status of the store should be equal idle", () => {
        const status: STORE_STATUS = STORE_STATUS.IDLE;
        mutations.SET_STATUS(state, status)
        expect(state.status).toEqual("idle");
    })
    it("status of the store should be equal failed", () => {
        const status: STORE_STATUS = STORE_STATUS.FAILED;
        mutations.SET_STATUS(state, status)
        expect(state.status).toEqual("failed");
    })
    it("status of the store should be equal loading", () => {
        const status: STORE_STATUS = STORE_STATUS.LOADING;
        mutations.SET_STATUS(state, status)
        expect(state.status).toEqual("loading");
    })
    it("status of the store should be equal success", () => {
        const status: STORE_STATUS = STORE_STATUS.SUCCESS;
        mutations.SET_STATUS(state, status)
        expect(state.status).toEqual("success");
    })
});
