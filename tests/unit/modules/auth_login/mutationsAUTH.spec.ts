import {AuthState} from "@/store/modules/auth_login/auth_login";
import {mutationsAuthorization} from "@/store/modules/auth_login/mutations_auth_login";

let startState: AuthState

beforeEach(() => {
    startState = {
        isAuth: false
    }
})

describe("Mutations, Authorization module, mutations_auth_login.ts", () => {

    it("user should be authorized", () => {
        const payload: { auth: boolean } = {auth: true}

        mutationsAuthorization.LOG_IN(startState, payload)
        expect(startState.isAuth).toEqual(true);
    })
    it("user should be unauthorized", () => {
        const payload: { auth: boolean } = {auth: false}

        mutationsAuthorization.LOG_OUT(startState, payload)
        expect(startState.isAuth).toEqual(false);
    })

});

