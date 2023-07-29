import {appActions, appReducer, InitialStateType, RequestStatusType} from "./app-slice.ts";

let initialState: InitialStateType;
beforeEach(() => {
    initialState = {
        status: "idle" as RequestStatusType,
        error: null,
    }
});

test("status should be set", () => {
    const newState = appReducer(initialState, appActions.setStatus({status: 'loading'}));
    expect(newState.status).toEqual('loading');
});

test("error should be set", () => {
    const newState = appReducer(initialState, appActions.setError({error: 'some error'}));
    expect(newState.error).toEqual('some error');
});
