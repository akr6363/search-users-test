import {UserInfoType, usersApi, UserType} from "./users-api.ts";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk, handleServerNetworkError} from "../../common/utils";
import {appActions} from "../app/users-slice.ts";

const initialState: InitialStateType = {
    users: [],
    userInfo: {} as UserInfoType,
    totalCount: 0, //всего найденных пользователей

    searchParams: {
        searchValue: '',
        page: 1, //текущая страница
        pageSize: 30, //кол-во отображаемых пользователей на одной странице
    },
    sortParams: {
        sortKey: null,
        sortDirection: null,
    },

};

const slice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        setTotalCount(state, action: PayloadAction<{ totalCount: number }>) {
            state.totalCount = action.payload.totalCount;
        },
        setSearchParams(state, action: PayloadAction<{ params: SearchParamsType }>) {
            state.searchParams = action.payload.params;
        },
        setSortParams(state, action: PayloadAction<{ params: SortParamsType }>) {
            state.sortParams = action.payload.params;
        },
        clean(state) {
            state.users = [];
            state.searchParams.page = 1
            state.searchParams.searchValue = ''
            state.totalCount = 0
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload.users;
            }).addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.userInfo = action.payload.userInfo;
        });
    },
});

//--------------------thunks-------------------------//

const fetchUsers = createAppAsyncThunk<{ users: UserType[] }>(
    "users/fetchUsers",
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue, getState} = thunkAPI;
        try {
            const {searchParams, sortParams} = getState().users
            dispatch(appActions.setStatus({status: "loading"}));
            const res = await usersApi.getUsers(searchParams, sortParams)
            dispatch(usersActions.setTotalCount({totalCount: res.total_count}));
            dispatch(appActions.setStatus({status: "succeeded"}));
            return {
                users: res.items,
            };
        } catch (error: unknown) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    },
);

const fetchUserInfo = createAppAsyncThunk<{ userInfo: UserInfoType }, { id: number }>(
    "users/fetchUserInfo",
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(appActions.setStatus({status: "loading"}));
            const res = await usersApi.getUserInfo(arg.id)
            dispatch(appActions.setStatus({status: "succeeded"}));
            return {
                userInfo: res,
            };
        } catch (error: unknown) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    },
);

//--------------------types-------------------------//

export const usersReducer = slice.reducer;
export const usersActions = slice.actions;
export const usersThunks = {fetchUsers, fetchUserInfo};

export type SortDirectionType = "asc" | "desc" | null
export type SortKeyType = 'followers' | 'repositories' | null
// export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type SortParamsType = {
    sortDirection: SortDirectionType;
    sortKey: SortKeyType;
};
export type SearchParamsType = {
    searchValue: string
    page: number, //текущая страница
    pageSize: number, //кол-во отображаемых пользователей на одной странице
}


export type InitialStateType = {
    users: UserType[]
    totalCount: number
    sortParams: SortParamsType
    searchParams: SearchParamsType
    userInfo: UserInfoType
};