// Package
import { combineReducers } from "@reduxjs/toolkit";

// Slices
import authReducer from "@/store/slices/auth.slice";
import generalReducer from "@/store/slices/general.slice";
import dashboardReducer from "@/store/slices/dashboard.slice";


const rootReducer = combineReducers({
  auth: authReducer,
  general: generalReducer,
  dashboard: dashboardReducer
});

export default rootReducer;