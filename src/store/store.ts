// Packages
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { useDispatch, useSelector } from 'react-redux'

// Configs
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

// Reducer
import rootReducer from "./root.reducer";

// Types & Const
import { AuthState, GeneralState } from "../types/store/slices/types";

export interface RootStoreState {
  auth: AuthState;
  general: GeneralState
}


const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "your-secret-key",
      onError: function (error) {
        console.error("Encryption error:", error);
      },
    }),
  ],
};

const persistedReducer = persistReducer<RootStoreState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Exporting typed Dispatch and Selector
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()