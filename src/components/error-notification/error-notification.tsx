import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {useAppSelector} from "../../common/hooks";
import s from './error-notification.module.scss'
import {appActions} from "../../model/app/users-slice.ts";

export const ErrorNotification = () => {
  const error = useAppSelector((state) => state.app.error);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      const timerId = setTimeout(() => {
        dispatch(appActions.setError({ error: null }));
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [error, dispatch]);

  const handleClose = () => {
    dispatch(appActions.setError({ error: null }));
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
