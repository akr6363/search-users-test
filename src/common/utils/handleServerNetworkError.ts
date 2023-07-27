import { Dispatch } from "redux";

import axios, { AxiosError } from "axios";
import {usersActions} from "../../components/Posts/posts-reducer.ts";

// export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
//   dispatch(postsActions.setError(error.message ? error.message : "Some error occurred"));
//   dispatch(setStatus("failed"));
// };

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : "Some error occurred";
    dispatch(usersActions.setError({ error }));
  } else {
    dispatch(usersActions.setError({ error: `Native error ${err.message}` }));
  }
  dispatch(usersActions.setError({ error: "failed" }));
};
