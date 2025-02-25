// Packages
import { createSlice } from "@reduxjs/toolkit";

// Types & Const
import { AuthState } from "../../types/store/slices/types";

// Thunks
import { loginThunk, sendOTPThunk, signupThunk } from "../thunks/auth.thunk";


const initialState: AuthState = {
  user: {
    email: null,
    role: null
  },
  token: null
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  
  extraReducers:
    (builder) => {
      builder
        .addCase(loginThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
          return {
            ...state,
            token: action.payload.data.token,
            user: {
              email: action.payload.data.email,
              role: action.payload.data.role
            }
          }
        })
        .addCase(loginThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(signupThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(signupThunk.fulfilled, (state) => {
          return {
            ...state,
          }
        })
        .addCase(signupThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(sendOTPThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(sendOTPThunk.fulfilled, (state) => {
          return {
            ...state,
          }
        })
        .addCase(sendOTPThunk.rejected, (state) => {
          return {
            ...state
          }
        })
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;