import { Dispatch } from "redux";

import axios, { AxiosError } from "axios";
import {appActions} from "../../model/app/users-slice.ts";


export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.response?.data.message || err.message || "Some error occurred";
    dispatch(appActions.setError({ error }));
  } else {
    dispatch(appActions.setError({ error: `Native error ${err.message}` }));
  }
  dispatch(appActions.setStatus({ status: "failed" }));
};
