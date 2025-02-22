// Package
import { combineReducers } from "@reduxjs/toolkit";

// Slices
import authReducer from "./slices/auth.slice";
import generalReducer from "./slices/general.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  general: generalReducer
});

export default rootReducer;