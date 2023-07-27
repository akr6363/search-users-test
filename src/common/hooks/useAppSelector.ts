import { TypedUseSelectorHook, useSelector } from "react-redux";
import {AppRootStateType} from "../../app/store.tsx";

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
