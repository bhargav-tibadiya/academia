interface StandardResponse {
  code: number
  success: boolean
  message: string
}

export type UserRole = "none" | "applied" | "accepted" | "rejected"

// ----->> COMMON <<-----
export interface User {
  _id: string
  email: string
  role: UserRole
  status: string
  userId: number
}

// ----->> USERS <<-----
export interface GetAllUsersThunkResponse extends StandardResponse {
  data: User[]
}

export interface GetUserByIdThunkResponse extends StandardResponse {
  data: User
}