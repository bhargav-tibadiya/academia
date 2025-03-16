// Packages
import { createSlice } from "@reduxjs/toolkit";

// Types & Const
import { DashboardState } from "@/types/store/slices/types";

// Thunks
import { createInstituteThunk, createUpdateThunk, deleteInstituteThunk, deleteUpdateThunk, getAllDepartmentThunk, getAllInstituteThunk, getAllUpdateThunk, getAllUsersThunk, getDepartmentByIdThunk, getInstituteByIdThunk, getUpdateByIdThunk, getUserByIdThunk, updateInstituteThunk, updateUpdateThunk, updateUserThunk, createDepartmentThunk, updateDepartmentThunk, deleteDepartmentThunk, getAllClassThunk, getClassByIdThunk, createClassThunk, updateClassThunk, deleteClassThunk } from "@/store/thunks/dashboard.thunk";


const initialState: DashboardState = {
  selectedUser: null,
  users: [],
  institutes: [],
  selectedInstitute: null,
  updates: [],
  selectedUpdate: null,
  departments: [],
  selectedDepartment: null,
  classes: [],
  selectedClass: null
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

        .addCase(updateUserThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(updateUserThunk.fulfilled, (state, action) => {
          return {
            ...state,
            selectedUser: action.payload.data,
            users: state.users.map((user) => user._id === action.payload.data._id ? action.payload.data : user)
          }
        })
        .addCase(updateUserThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        // ----->> Institutes <<-----
        .addCase(getAllInstituteThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(getAllInstituteThunk.fulfilled, (state, action) => {
          return {
            ...state,
            institutes: action.payload.data
          }
        })
        .addCase(getAllInstituteThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(getInstituteByIdThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(getInstituteByIdThunk.fulfilled, (state, action) => {
          return {
            ...state,
            selectedInstitute: action.payload.data
          }
        })
        .addCase(getInstituteByIdThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(createInstituteThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(createInstituteThunk.fulfilled, (state, action) => {
          return {
            ...state,
            institutes: [...state.institutes, action.payload.data]
          }
        })
        .addCase(createInstituteThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(updateInstituteThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(updateInstituteThunk.fulfilled, (state, action) => {
          return {
            ...state,
            institutes: state.institutes.map((institute) => institute._id === action.payload.data._id ? action.payload.data : institute)
          }
        })
        .addCase(updateInstituteThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(deleteInstituteThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(deleteInstituteThunk.fulfilled, (state, action) => {
          return {
            ...state,
            institutes: state.institutes.filter((institute) => institute._id !== action.payload._id)
          }
        })
        .addCase(deleteInstituteThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        // ----->> Updates <<-----
        .addCase(getAllUpdateThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(getAllUpdateThunk.fulfilled, (state, action) => {
          return {
            ...state,
            updates: action.payload.data
          }
        })
        .addCase(getAllUpdateThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(getUpdateByIdThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(getUpdateByIdThunk.fulfilled, (state, action) => {
          return {
            ...state,
            selectedUpdate: action.payload.data
          }
        })
        .addCase(getUpdateByIdThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(createUpdateThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(createUpdateThunk.fulfilled, (state, action) => {
          return {
            ...state,
            updates: [...state.updates, action.payload.data]
          }
        })
        .addCase(createUpdateThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(updateUpdateThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(updateUpdateThunk.fulfilled, (state, action) => {
          return {
            ...state,
            updates: state.updates.map((update) => update._id === action.payload.data._id ? action.payload.data : update)
          }
        })
        .addCase(updateUpdateThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(deleteUpdateThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(deleteUpdateThunk.fulfilled, (state, action) => {
          return {
            ...state,
            updates: state.updates.filter((update) => update._id !== action.payload._id)
          }
        })
        .addCase(deleteUpdateThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        // ----->> Departments <<-----
        .addCase(getAllDepartmentThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(getAllDepartmentThunk.fulfilled, (state, action) => {
          return {
            ...state,
            departments: action.payload.data
          }
        })
        .addCase(getAllDepartmentThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(getDepartmentByIdThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(getDepartmentByIdThunk.fulfilled, (state, action) => {
          return {
            ...state,
            selectedDepartment: action.payload.data
          }
        })
        .addCase(getDepartmentByIdThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(createDepartmentThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(createDepartmentThunk.fulfilled, (state, action) => {
          return {
            ...state,
            departments: [...state.departments, action.payload.data]
          }
        })
        .addCase(createDepartmentThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(updateDepartmentThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(updateDepartmentThunk.fulfilled, (state, action) => {
          return {
            ...state,
            departments: state.departments.map((department) => department._id === action.payload.data._id ? action.payload.data : department)
          }
        })
        .addCase(updateDepartmentThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(deleteDepartmentThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(deleteDepartmentThunk.fulfilled, (state, action) => {
          return {
            ...state,
            departments: state.departments.filter((department) => department._id !== action.payload._id)
          }
        })
        .addCase(deleteDepartmentThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        // ----->> Classes <<-----
        .addCase(getAllClassThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(getAllClassThunk.fulfilled, (state, action) => {
          return {
            ...state,
            classes: action.payload.data
          }
        })
        .addCase(getAllClassThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(getClassByIdThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(getClassByIdThunk.fulfilled, (state, action) => {
          return {
            ...state,
            selectedClass: action.payload.data
          }
        })
        .addCase(getClassByIdThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(createClassThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(createClassThunk.fulfilled, (state, action) => {
          return {
            ...state,
            classes: [...state.classes, action.payload.data]
          }
        })
        .addCase(createClassThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(updateClassThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(updateClassThunk.fulfilled, (state, action) => {
          return {
            ...state,
            classes: state.classes.map((classItem) => classItem._id === action.payload.data._id ? action.payload.data : classItem)
          }
        })
        .addCase(updateClassThunk.rejected, (state) => {
          return {
            ...state
          }
        })

        .addCase(deleteClassThunk.pending, (state) => {
          return {
            ...state
          }
        })
        .addCase(deleteClassThunk.fulfilled, (state, action) => {
          return {
            ...state,
            classes: state.classes.filter((classItem) => classItem._id !== action.payload._id)
          }
        })
        .addCase(deleteClassThunk.rejected, (state) => {
          return {
            ...state
          }
        })
    }
});

// export const { } = dashboardSlice.actions;
export default dashboardSlice.reducer;