import { useDispatch } from "react-redux";
import {AppDispatch} from "../../app/store.tsx";

export const useAppDispatch = () => useDispatch<AppDispatch>();
