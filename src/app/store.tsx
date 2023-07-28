import { AnyAction, combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import {usersReducer} from "../model/users/users-slice.ts";
import {appReducer} from "../model/app/users-slice.ts";

const rootReducer = combineReducers({
  users: usersReducer,
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;
// @ts-ignore
window.store = store;
