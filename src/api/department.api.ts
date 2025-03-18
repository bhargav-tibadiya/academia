// Utils & Config
import { API } from "@/utils/constants/api";
import requestProtected from "@/api/root.api";

// Types & Constant
import { CreateDepartmentThunkRequest, DeleteDepartmentThunkRequest, GetDepartmentByIdThunkRequest, UpdateDepartmentAPIPayload } from "@/types/store/thunks/dashboard";

export const departmentServices = {
  getAllDepartment: () => requestProtected.get(API.DEPARTMENT.GET),
  getDepartmentById: (data: GetDepartmentByIdThunkRequest) => requestProtected.get(API.DEPARTMENT.GET_BY_ID.replace(":departmentId", data.departmentId)),
  createDepartment: (data: CreateDepartmentThunkRequest) => requestProtected.post(API.DEPARTMENT.CREATE, data),
  updateDepartment: (departmentId: string, data: UpdateDepartmentAPIPayload) => requestProtected.put(API.DEPARTMENT.UPDATE.replace(":departmentId", departmentId), data),
  deleteDepartment: (data: DeleteDepartmentThunkRequest) => requestProtected.delete(API.DEPARTMENT.DELETE.replace(":departmentId", data.departmentId)),
}