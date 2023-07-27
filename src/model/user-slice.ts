import {usersApi, UserType} from "./user-api.ts";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk, handleServerNetworkError} from "../common/utils";

const initialState: InitialStateType = {
    users: [],
    searchValue: '',
    totalCount: 0, //всего найденных пользователей
    status: "idle" as RequestStatusType,
    error: null,
    currentPage: 1, //текущая страница
    pageSize: 30, //кол-во отображаемых пользователей на одной странице
    sortParams: {
        sortKey: null,
        sortDirection: null,
    }
};

const slice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {
        setTotalCount(state, action: PayloadAction<{ totalCount: number }>) {
            state.totalCount = action.payload.totalCount;
        },
        setCurrentPage(state, action: PayloadAction<{ currentPage: number }>) {
            state.currentPage = action.payload.currentPage;
        },
        setSearchValue(state, action: PayloadAction<{ value: string }>) {
            state.searchValue = action.payload.value;
        },
        setPageSize(state, action: PayloadAction<{ pageSize: number }>) {
            state.pageSize = action.payload.pageSize;
        },
        // setSortParams(state, action: PayloadAction<{ params: SortParamsType }>) {
        //   state.sortParams = action.payload.params;
        // },
        setStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload.users;
        });
    },
});

//--------------------thunks-------------------------//

const fetchUsers = createAppAsyncThunk<{ users: UserType[] }, { login: string, page: number, pageSize: number, sortParams: SortParamsType }>(
    "users/fetchUsers",
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(usersActions.setStatus({status: "loading"}));
            const res = await usersApi.getUsers(arg.login, arg.page, arg.pageSize, arg.sortParams);
            dispatch(usersActions.setTotalCount({totalCount: res.total_count}));
            dispatch(usersActions.setStatus({status: "succeeded"}));
            return {
                users: res.items,
            };
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    },
);

//--------------------types-------------------------//

export const usersReducer = slice.reducer;
export const usersActions = slice.actions;
export const usersThunks = {fetchUsers};

export type SortDirectionType = "asc" | "desc" | null
type SortKeyType = 'followers' | 'repositories' | null

export type SortParamsType = {
    sortDirection: SortDirectionType;
    sortKey: SortKeyType;
};
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type InitialStateType = {
    users: UserType[]
    searchValue: string
    totalCount: number
    currentPage: number
    status: RequestStatusType
    error: string | null
    pageSize: number
    sortParams: SortParamsType
};
