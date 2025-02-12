// Utils & Config
import requestProtected from "./root.api";

// Types & Constant
import { LoginThunkPayload, SendOTPThunkPayload, SignupThunkPayload } from "../types/store/thunks/auth";

export const authServices = {
  login: (data: LoginThunkPayload) => requestProtected.post("/auth/login", data),
  signup: (data: SignupThunkPayload) => requestProtected.post("/auth/signup", data),
  sendOtp: (data: SendOTPThunkPayload) => requestProtected.post("/auth/sendotp", data),
}