// Utils & Config
import { API } from "@/utils/constants/api";
import requestProtected from "@/api/root.api";

// Types & Constant
import { CreateInstituteThunkRequest, DeleteInstituteThunkRequest, GetInstituteByIdThunkRequest, UpdateInstituteAPIPayload } from "@/types/store/thunks/dashboard";

export const instituteServices = {
  getAllInstitute: () => requestProtected.get(API.INSTITUTE.GET),
  getInstituteById: (data: GetInstituteByIdThunkRequest) => requestProtected.get(API.INSTITUTE.GET_BY_ID.replace(":instituteId", data.instituteId)),
  createInstitute: (data: CreateInstituteThunkRequest) => requestProtected.post(API.INSTITUTE.CREATE, data),
  updateInstitute: (instituteId: string, data: UpdateInstituteAPIPayload) => requestProtected.put(API.INSTITUTE.UPDATE.replace(":instituteId", instituteId), data),
  deleteInstitute: (data: DeleteInstituteThunkRequest) => requestProtected.delete(API.INSTITUTE.DELETE.replace(":instituteId", data.instituteId)),
}