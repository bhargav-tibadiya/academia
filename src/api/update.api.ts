// Utils & Config
import { API } from "@/utils/constants/api";
import requestProtected from "@/api/root.api";

// Types & Constant
import { CreateUpdateThunkRequest, UpdateUpdateThunkRequest, DeleteUpdateThunkRequest, GetUpdateByIdThunkRequest } from "@/types/store/thunks/dashboard";

export const updateServices = {
  getAllUpdate: () => requestProtected.get(API.UPDATE.GET),
  getUpdateById: (data: GetUpdateByIdThunkRequest) => requestProtected.get(API.UPDATE.GET_BY_ID.replace(":updateId", data.updateId)),
  createUpdate: (data: CreateUpdateThunkRequest) => requestProtected.post(API.UPDATE.CREATE, data),
  updateUpdate: (data: UpdateUpdateThunkRequest) => requestProtected.put(API.UPDATE.UPDATE.replace(":updateId", data.updateId), data),
  deleteUpdate: (data: DeleteUpdateThunkRequest) => requestProtected.delete(API.UPDATE.DELETE.replace(":updateId", data.updateId)),
}