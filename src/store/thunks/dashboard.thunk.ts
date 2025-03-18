// Packages
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Utils & Configs
import { userServices } from "@/api/user.api";

// Types & Const
import { CreateClassThunkRequest, CreateClassThunkResponse, CreateDepartmentThunkRequest, CreateDepartmentThunkResponse, CreateInstituteThunkRequest, CreateInstituteThunkResponse, CreateProfileThunkRequest, CreateProfileThunkResponse, CreateUpdateThunkRequest, CreateUpdateThunkResponse, DeleteClassThunkRequest, DeleteClassThunkResponse, DeleteDepartmentThunkRequest, DeleteDepartmentThunkResponse, DeleteInstituteThunkRequest, DeleteInstituteThunkResponse, DeleteProfileThunkRequest, DeleteProfileThunkResponse, DeleteUpdateThunkRequest, DeleteUpdateThunkResponse, GetAllClassThunkResponse, GetAllDepartmentThunkResponse, GetAllInstituteThunkResponse, GetAllProfileThunkResponse, GetAllUpdateThunkResponse, GetAllUsersThunkResponse, GetClassByIdThunkRequest, GetClassByIdThunkResponse, GetDepartmentByIdThunkRequest, GetDepartmentByIdThunkResponse, GetInstituteByIdThunkRequest, GetInstituteByIdThunkResponse, GetProfileByIdThunkRequest, GetProfileByIdThunkResponse, GetUpdateByIdThunkRequest, GetUpdateByIdThunkResponse, GetUserByIdThunkResponse, UpdateClassThunkRequest, UpdateClassThunkResponse, UpdateDepartmentThunkRequest, UpdateDepartmentThunkResponse, UpdateInstituteThunkRequest, UpdateInstituteThunkResponse, UpdateProfileThunkRequest, UpdateProfileThunkResponse, UpdateUpdateThunkRequest, UpdateUpdateThunkResponse, UpdateUserThunkRequest, UpdateUserThunkResponse } from "@/types/store/thunks/dashboard";
import { updateServices } from "@/api/update.api";
import { instituteServices } from "@/api/institute.api";
import { departmentServices } from "@/api/department.api";
import { classServices } from "@/api/class.api";
import { profileServices } from "@/api/profile.api";

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
      }
      return rejectWithValue(response.data)
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
      }
      return rejectWithValue(response.data)
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
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

// ----->> UPDATE <<-----
export const getAllUpdateThunk = createAsyncThunk<GetAllUpdateThunkResponse, void>(
  'dashboard/update/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await updateServices.getAllUpdate();
      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const getUpdateByIdThunk = createAsyncThunk<GetUpdateByIdThunkResponse, GetUpdateByIdThunkRequest>(
  'dashboard/update/getById',
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateServices.getUpdateById(data);
      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const createUpdateThunk = createAsyncThunk<CreateUpdateThunkResponse, CreateUpdateThunkRequest>(
  'dashboard/update/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateServices.createUpdate(data);
      if (response.status === 201 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const updateUpdateThunk = createAsyncThunk<UpdateUpdateThunkResponse, UpdateUpdateThunkRequest>(
  'dashboard/update/update',
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateServices.updateUpdate(data);
      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const deleteUpdateThunk = createAsyncThunk<DeleteUpdateThunkResponse, DeleteUpdateThunkRequest>(
  'dashboard/update/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateServices.deleteUpdate(data);
      if (response.status === 200 && response.data.success) {
        response.data = { _id: data.updateId }
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

// ----->> INSTITUTE <<-----
export const getAllInstituteThunk = createAsyncThunk<GetAllInstituteThunkResponse, void>(
  'dashboard/institute/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instituteServices.getAllInstitute();
      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const getInstituteByIdThunk = createAsyncThunk<GetInstituteByIdThunkResponse, GetInstituteByIdThunkRequest>(
  'dashboard/institute/getById',
  async (data, { rejectWithValue }) => {
    try {
      const response = await instituteServices.getInstituteById(data);
      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const createInstituteThunk = createAsyncThunk<CreateInstituteThunkResponse, CreateInstituteThunkRequest>(
  'dashboard/institute/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await instituteServices.createInstitute(data);
      if (response.status === 201 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const updateInstituteThunk = createAsyncThunk<UpdateInstituteThunkResponse, UpdateInstituteThunkRequest>(
  'dashboard/institute/update',
  async (data, { rejectWithValue }) => {
    try {
      const { instituteId, ...payload } = data;
      const response = await instituteServices.updateInstitute(instituteId, payload);
      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const deleteInstituteThunk = createAsyncThunk<DeleteInstituteThunkResponse, DeleteInstituteThunkRequest>(
  'dashboard/institute/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await instituteServices.deleteInstitute(data);
      if (response.status === 200 && response.data.success) {
        response.data = { _id: data.instituteId }
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

// ----->> DEPARTMENT <<-----
export const getAllDepartmentThunk = createAsyncThunk<GetAllDepartmentThunkResponse, void>(
  'dashboard/department/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await departmentServices.getAllDepartment();
      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const getDepartmentByIdThunk = createAsyncThunk<GetDepartmentByIdThunkResponse, GetDepartmentByIdThunkRequest>(
  'dashboard/department/getById',
  async (data, { rejectWithValue }) => {
    try {
      const response = await departmentServices.getDepartmentById(data);
      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const createDepartmentThunk = createAsyncThunk<CreateDepartmentThunkResponse, CreateDepartmentThunkRequest>(
  'dashboard/department/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await departmentServices.createDepartment(data);
      if (response.status === 201 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const updateDepartmentThunk = createAsyncThunk<UpdateDepartmentThunkResponse, UpdateDepartmentThunkRequest>(
  'dashboard/department/update',
  async (data, { rejectWithValue }) => {
    try {
      const { departmentId, ...payload } = data;
      const response = await departmentServices.updateDepartment(departmentId, payload);
      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const deleteDepartmentThunk = createAsyncThunk<DeleteDepartmentThunkResponse, DeleteDepartmentThunkRequest>(
  'dashboard/department/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await departmentServices.deleteDepartment(data);
      if (response.status === 200 && response.data.success) {
        response.data = { _id: data.departmentId }
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

// ----->> CLASS <<-----
export const getAllClassThunk = createAsyncThunk<GetAllClassThunkResponse, void>(
  'dashboard/class/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await classServices.getAllClass();
      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const getClassByIdThunk = createAsyncThunk<GetClassByIdThunkResponse, GetClassByIdThunkRequest>(
  'dashboard/class/getById',
  async (data, { rejectWithValue }) => {
    try {
      const response = await classServices.getClassById(data);
      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const createClassThunk = createAsyncThunk<CreateClassThunkResponse, CreateClassThunkRequest>(
  'dashboard/class/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await classServices.createClass(data);
      if (response.status === 201 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const updateClassThunk = createAsyncThunk<UpdateClassThunkResponse, UpdateClassThunkRequest>(
  'dashboard/class/update',
  async (data, { rejectWithValue }) => {
    try {
      const { classId, ...payload } = data;
      const response = await classServices.updateClass(classId, payload);
      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const deleteClassThunk = createAsyncThunk<DeleteClassThunkResponse, DeleteClassThunkRequest>(
  'dashboard/class/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await classServices.deleteClass(data);
      if (response.status === 200 && response.data.success) {
        response.data = { _id: data.classId }
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

// ----->> PROFILE <<-----
export const getAllProfileThunk = createAsyncThunk<GetAllProfileThunkResponse, void>(
  'dashboard/profile/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileServices.getAllProfile();
      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const getProfileByIdThunk = createAsyncThunk<GetProfileByIdThunkResponse, GetProfileByIdThunkRequest>(
  'dashboard/profile/getById',
  async (data, { rejectWithValue }) => {
    try {
      const response = await profileServices.getProfileById(data);

      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const createProfileThunk = createAsyncThunk<CreateProfileThunkResponse, CreateProfileThunkRequest>(
  'dashboard/profile/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await profileServices.createProfile(data);
      if (response.status === 201 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const updateProfileThunk = createAsyncThunk<UpdateProfileThunkResponse, UpdateProfileThunkRequest>(
  'dashboard/profile/update',
  async (data, { rejectWithValue }) => {
    try {
      const { profileId, ...payload } = data;
      const response = await profileServices.updateProfile(profileId, payload);
      if (response.status === 200 && response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
)

export const deleteProfileThunk = createAsyncThunk<DeleteProfileThunkResponse, DeleteProfileThunkRequest>(
  'dashboard/profile/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await profileServices.deleteProfile(data);
      if (response.status === 200 && response.data.success) {
        response.data = { _id: data.profileId }
        return response.data;
      }
      return rejectWithValue(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? defaultError);
      }
      return rejectWithValue(defaultError);
    }
  }
) 