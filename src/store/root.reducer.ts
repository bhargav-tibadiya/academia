// Package
import { combineReducers } from "@reduxjs/toolkit";

// Slices
import authReducer from "./slices/auth.slice";
import generalReducer from "./slices/general.slice";
import dashboardReducer from "./slices/dashboard.slice";


const rootReducer = combineReducers({
  auth: authReducer,
  general: generalReducer,
  dashboard: dashboardReducer
});

export default rootReducer;