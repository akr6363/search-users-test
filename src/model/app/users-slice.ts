import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: "idle" as RequestStatusType,
    error: null,
};

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        }
}});

//--------------------types-------------------------//

export const appReducer = slice.reducer;
export const appActions = slice.actions;

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
};