// Utils & Config
import { API } from "../utils/constants/api";
import requestProtected from "./root.api";

// Types & Constant

export const userServices = {
  getAllUsers: () => requestProtected.get(API.USER.GET),
  getUserById: (userId: string) => requestProtected.get(API.USER.GET_BY_ID.replace(":userId", userId)),
}