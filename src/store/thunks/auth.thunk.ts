// Packages
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Utils & Configs
import { authServices } from "../../api/auth.api";

// Types & Const
import { LoginThunkPayload, LoginThunkResponse, SendOTPThunkPayload, SendOTPThunkResponse, SignupThunkPayload, SignupThunkResponse } from "../../types/store/thunks/auth";

const defaultError = {
  code: 500,
  message: "Some Error Detected",
  success: false,
  data: {}
}

export const loginThunk = createAsyncThunk<LoginThunkResponse, LoginThunkPayload>(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authServices.login(payload);
      if (response.status === 200 && response.data.success) {
        sessionStorage.setItem("token", response.data.data.token)
        return response.data;
      } else {
        return rejectWithValue(response.data)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const signupThunk = createAsyncThunk<SignupThunkResponse, SignupThunkPayload>(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authServices.signup(payload);
      if (response.status === 201 && response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data)
      }
    } catch (error) {
      // return rejectWithValue(error.data)
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const sendOTPThunk = createAsyncThunk<SendOTPThunkResponse, SendOTPThunkPayload>(
  'auth/sendOtp',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authServices.sendOtp(payload);
      if (response.status === 200 && response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data)
      }
    } catch (error) {
      // return rejectWithValue(error.data)
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)