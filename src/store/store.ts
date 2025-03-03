// Packages
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'

// Configs

// Reducer
import rootReducer from "./root.reducer";

// Types & Const
import { AuthState, GeneralState } from "../types/store/slices/types";

export interface RootStoreState {
  auth: AuthState;
  general: GeneralState
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


// Exporting typed Dispatch and Selector
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()