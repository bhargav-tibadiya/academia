// Packages
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Utils & Configs
import { userServices } from "@/api/user.api";

// Types & Const
import { GetAllUsersThunkResponse, GetUserByIdThunkResponse, UpdateUserThunkRequest, UpdateUserThunkResponse } from "@/types/store/thunks/dashboard";

// ----->> COMMON <<-----
const defaultError = {
  code: 500,
  message: "Some Error Detected",
  success: false,
  data: {}
}


// ----->> USERS <<-----
export const getAllUsersThunk = createAsyncThunk<GetAllUsersThunkResponse, void>(
  'dashboard/users/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userServices.getAllUsers();
      if (response.status === 200 && response.data.success) {
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

export const getUserByIdThunk = createAsyncThunk<GetUserByIdThunkResponse, string>(
  'dashboard/users/getById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userServices.getUserById(userId);
      if (response.status === 200 && response.data.success) {
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

export const updateUserThunk = createAsyncThunk<UpdateUserThunkResponse, UpdateUserThunkRequest>(
  'dashboard/users/update',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userServices.updateUser(data._id, data);
      if (response.status === 200 && response.data.success) {
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
