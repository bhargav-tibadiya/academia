// Utils & Config
import { API } from "@/utils/constants/api";
import requestProtected from "@/api/root.api";

// Types & Constant
import { CreateClassThunkRequest, DeleteClassThunkRequest, GetClassByIdThunkRequest, UpdateClassAPIPayload } from "@/types/store/thunks/dashboard";

export const classServices = {
  getAllClass: () => requestProtected.get(API.CLASS.GET),
  getClassById: (data: GetClassByIdThunkRequest) => requestProtected.get(API.CLASS.GET_BY_ID.replace(":classId", data.classId)),
  createClass: (data: CreateClassThunkRequest) => requestProtected.post(API.CLASS.CREATE, data),
  updateClass: (classId: string, data: UpdateClassAPIPayload) => requestProtected.put(API.CLASS.UPDATE.replace(":classId", classId), data),
  deleteClass: (data: DeleteClassThunkRequest) => requestProtected.delete(API.CLASS.DELETE.replace(":classId", data.classId)),
}