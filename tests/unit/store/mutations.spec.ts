import {StoreState, STORE_STATUS} from "@/store";
import {mutations} from "@/store/mutations";

let state: StoreState

beforeEach(() => {
    state = {
        status: "idle",
        error: null
    }
})

describe("Mutations of the state, index.ts", () => {
    it("status of the state should be equal idle", () => {
        const status: STORE_STATUS = STORE_STATUS.IDLE;
        mutations.SET_STATUS(state, status)
        expect(state.status).toEqual("idle");
    })
    it("status of the state should be equal failed", () => {
        const status: STORE_STATUS = STORE_STATUS.FAILED;
        mutations.SET_STATUS(state, status)
        expect(state.status).toEqual("failed");
    })
    it("status of the state should be equal loading", () => {
        const status: STORE_STATUS = STORE_STATUS.LOADING;
        mutations.SET_STATUS(state, status)
        expect(state.status).toEqual("loading");
    })
    it("status of the state should be equal success", () => {
        const status: STORE_STATUS = STORE_STATUS.SUCCESS;
        mutations.SET_STATUS(state, status)
        expect(state.status).toEqual("success");
    })
    it("should set error state when dashboard api return some error", () => {
        const errorMessage: string = 'Some error';
        mutations.SET_ERROR(state, errorMessage)
        expect(state.status).toEqual("idle");
        expect(state.error).toEqual("Some error");
    })
});
