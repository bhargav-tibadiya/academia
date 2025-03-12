// Utils & Config
import { API } from "@/utils/constants/api";
import requestProtected from "@/api/root.api";

// Types & Constant
import { UpdateUserThunkRequest } from "@/types/store/thunks/dashboard";

export const userServices = {
  getAllUsers: () => requestProtected.get(API.USER.GET),
  getUserById: (userId: string) => requestProtected.get(API.USER.GET_BY_ID.replace(":userId", userId)),
  updateUser: (userId: string, data: UpdateUserThunkRequest) => requestProtected.put(API.USER.UPDATE.replace(":userId", userId), data),
}