interface StandardResponse {
  code: number
  success: boolean
  message: string
}

export type UserStatus = "none" | "applied" | "accepted" | "rejected"
export type UserRole = "student" | "teacher" | "admin"

// ----->> COMMON <<-----
export interface User {
  _id: string
  email: string
  role: UserRole
  status: UserStatus
  userId: number
}

// ----->> USERS <<-----
export interface GetAllUsersThunkResponse extends StandardResponse {
  data: User[]
}
// 
export interface GetUserByIdThunkResponse extends StandardResponse {
  data: User
}
// 
export interface UpdateUserThunkRequest {
  _id: string
  email: string
  role: UserRole
  status: UserStatus
}
export interface UpdateUserThunkResponse extends StandardResponse {
  data: User
}