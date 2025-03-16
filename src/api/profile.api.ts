// Utils & Config
import { API } from "@/utils/constants/api";
import requestProtected from "@/api/root.api";

// Types & Constant
import { CreateProfileThunkRequest, DeleteProfileThunkRequest, GetProfileByIdThunkRequest, UpdateProfileAPIPayload } from "@/types/store/thunks/dashboard";

export const profileServices = {
  getAllProfile: () => requestProtected.get(API.PROFILE.GET),
  getProfileById: (data: GetProfileByIdThunkRequest) => requestProtected.get(API.PROFILE.GET_BY_ID.replace(":profileId", data.profileId)),
  createProfile: (data: CreateProfileThunkRequest) => requestProtected.post(API.PROFILE.CREATE, data),
  updateProfile: (profileId: string, data: UpdateProfileAPIPayload) => requestProtected.put(API.PROFILE.UPDATE.replace(":profileId", profileId), data),
  deleteProfile: (data: DeleteProfileThunkRequest) => requestProtected.delete(API.PROFILE.DELETE.replace(":profileId", data.profileId)),
}