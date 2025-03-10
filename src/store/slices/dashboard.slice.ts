// Packages
import { createSlice } from "@reduxjs/toolkit";

// Types & Const
import { DashboardState } from "../../types/store/slices/types";

// Thunks
import { getAllUsersThunk, getUserByIdThunk } from "../thunks/dashboard.thunk";


const initialState: DashboardState = {
  selectedUser: null,
  users: []
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
  },

  extraReducers:
    (builder) => {
      builder
        // ----->> Users <<-----
        .addCase(getAllUsersThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(getAllUsersThunk.fulfilled, (state, action) => {
          return {
            ...state,
            users: action.payload.data
          }
        })
        .addCase(getAllUsersThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(getUserByIdThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(getUserByIdThunk.fulfilled, (state, action) => {
          return {
            ...state,
            selectedUser: action.payload.data
          }
        })
        .addCase(getUserByIdThunk.rejected, (state) => {
          return {
            ...state
          }
        })
    }
});

// export const { } = dashboardSlice.actions;
export default dashboardSlice.reducer;