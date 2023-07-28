import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {useAppSelector} from "../../common/hooks";
import { usersActions} from "../../model/users/users-slice.ts";

import s from './error-notification.module.scss'
export const ErrorNotification = () => {
  const error = useAppSelector((state) => state.users.error);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      const timerId = setTimeout(() => {
        dispatch(usersActions.setError({ error: null }));
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [error, dispatch]);

  const handleClose = () => {
    dispatch(usersActions.setError({ error: null }));
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={s.container}>
      <div className={s.error}>{error}</div>
      <button className={s.closeBtn} onClick={handleClose}>X</button>
    </div>
  );
};
