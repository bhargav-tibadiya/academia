// Package
import { combineReducers } from "@reduxjs/toolkit";

// Slices
import authReducer from "./slices/auth.slice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;