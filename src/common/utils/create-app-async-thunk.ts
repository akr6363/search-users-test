import { createAsyncThunk } from "@reduxjs/toolkit";
import {AppDispatch, AppRootStateType} from "../../app/store.tsx";


export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatch;
  rejectValue: null;
}>();
