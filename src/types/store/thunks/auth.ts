export interface StandardResponse {
  code: number
  success: boolean
  message: string
}


export interface LoginThunkPayload {
  email: string
  password: string
}
export interface LoginThunkResponse extends StandardResponse {
  data: {
    _id: string
    email: string
    password: string
    role: string
    status: string
    createdAt: string
    updatedAt: string
    userId: number
    token: string
  }
}

export interface SignupThunkPayload {
  email: string
  password: string
  otp: string
  role: string
}
export interface SignupThunkResponse extends StandardResponse {
  data: {
    _id: string
    email: string
    password: string
    role: string
    status: string
    createdAt: string
    updatedAt: string
    userId: number
    token: string
  }
}

export interface SendOTPThunkPayload {
  email: string
}
export interface SendOTPThunkResponse {
  success: boolean
  message: string
}