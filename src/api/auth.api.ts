// Utils & Config
import requestProtected from "@/api/root.api";

// Types & Constant
import { LoginThunkPayload, SendOTPThunkPayload, SignupThunkPayload } from "@/types/store/thunks/auth";
import { API } from "@/utils/constants/api";

export const authServices = {
  login: (data: LoginThunkPayload) => requestProtected.post(API.AUTH.LOGIN, data),
  signup: (data: SignupThunkPayload) => requestProtected.post(API.AUTH.SIGNUP, data),
  sendOtp: (data: SendOTPThunkPayload) => requestProtected.post(API.AUTH.SEND_OTP, data),
}