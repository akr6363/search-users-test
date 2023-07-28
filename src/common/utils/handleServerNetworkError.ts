import { Dispatch } from "redux";

import axios, { AxiosError } from "axios";
import {usersActions} from "../../model/users/users-slice.ts";


export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.response?.data.message || err.message || "Some error occurred";
    dispatch(usersActions.setError({ error }));
  } else {
    dispatch(usersActions.setError({ error: `Native error ${err.message}` }));
  }
  dispatch(usersActions.setStatus({ status: "failed" }));
};
