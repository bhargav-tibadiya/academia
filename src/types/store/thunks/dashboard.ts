interface StandardResponse {
  code: number
  success: boolean
  message: string
}

export type UserStatus = "none" | "applied" | "accepted" | "rejected"
export type UserRole = "student" | "teacher" | "admin"
export type GenderType = "Male" | "Female" | "Other"

// ----->> COMMON <<-----
export interface User {
  _id: string
  email: string
  role: UserRole
  status: UserStatus
  userId: number
}

export interface Update {
  _id: string
  date: string
  title: string
  description: string
  sender: string
  lastUpdated: string
  tags: string
}

export interface Institute {
  _id: string
  name: string
  departments: string[]
  createdAt: string
  updatedAt: string
}

export interface Department {
  _id: string
  name: string
  classes: string[]
  institute: string
  batch: string
  createdAt: string
  updatedAt: string
}

export interface Class {
  _id: string
  name: string
  department: string
  students: string[]
  timeTable: string
  exams: string[]
  updates: string[]
  createdAt: string
  updatedAt: string
}

export interface Profile {
  _id: string
  userId: number
  firstName: string
  middleName: string
  lastName: string
  gender: GenderType
  birthDate: string
  bloodGroup: string
  address: string
  contact: string
  fatherName: string
  fatherContact: string
  motherName: string
  motherContact: string
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

// ----->> UPDATE <<-----
export interface GetAllUpdateThunkResponse extends StandardResponse {
  data: Update[]
}
//
export interface GetUpdateByIdThunkRequest {
  updateId: string
}
export interface GetUpdateByIdThunkResponse extends StandardResponse {
  data: Update
}
//
export interface CreateUpdateThunkRequest {
  date: string
  title: string
  description: string
  sender: string
  lastUpdated: string
  tags: string
}
export interface CreateUpdateThunkResponse extends StandardResponse {
  data: Update
}
//
export interface UpdateUpdateThunkRequest {
  updateId: string
  date: string
  title: string
  description: string
  sender: string
  lastUpdated: string
  tags: string
}
export interface UpdateUpdateThunkResponse extends StandardResponse {
  data: Update
}
//
export interface DeleteUpdateThunkRequest {
  updateId: string
}
export interface DeleteUpdateThunkResponse extends StandardResponse {
  _id: string
}

// ----->> INSTITUTE <<-----
export interface GetAllInstituteThunkResponse extends StandardResponse {
  data: Institute[]
}
// 
export interface GetInstituteByIdThunkRequest {
  instituteId: string
}
export interface GetInstituteByIdThunkResponse extends StandardResponse {
  data: Institute
}
//
export interface CreateInstituteThunkRequest {
  name: string
}
export interface CreateInstituteThunkResponse extends StandardResponse {
  data: Institute
}
//
export interface UpdateInstituteAPIPayload {
  name: string
}
export interface UpdateInstituteThunkRequest {
  instituteId: string
  name: string
}
export interface UpdateInstituteThunkResponse extends StandardResponse {
  data: Institute
}
//
export interface DeleteInstituteThunkRequest {
  instituteId: string
}
export interface DeleteInstituteThunkResponse extends StandardResponse {
  _id: string
}

// ----->> DEPARTMENT <<-----
export interface GetAllDepartmentThunkResponse extends StandardResponse {
  data: Department[]
}
//
export interface GetDepartmentByIdThunkRequest {
  departmentId: string
}
export interface GetDepartmentByIdThunkResponse extends StandardResponse {
  data: Department
}
//
export interface CreateDepartmentThunkRequest {
  name: string
  institute: string
  batch: string
}
export interface CreateDepartmentThunkResponse extends StandardResponse {
  data: Department
}
//
export interface UpdateDepartmentAPIPayload {
  name: string
  institute: string
  batch: string
}
export interface UpdateDepartmentThunkRequest {
  departmentId: string
  name: string
  institute: string
  batch: string
}
export interface UpdateDepartmentThunkResponse extends StandardResponse {
  data: Department
}
//
export interface DeleteDepartmentThunkRequest {
  departmentId: string
}
export interface DeleteDepartmentThunkResponse extends StandardResponse {
  _id: string
}

// ----->> CLASS <<-----
export interface GetAllClassThunkResponse extends StandardResponse {
  data: Class[]
}
//
export interface GetClassByIdThunkRequest {
  classId: string
}
export interface GetClassByIdThunkResponse extends StandardResponse {
  data: Class
}
//  
export interface CreateClassThunkRequest {
  name: string
  department: string
}
export interface CreateClassThunkResponse extends StandardResponse {
  data: Class
}
//
export interface UpdateClassAPIPayload {
  name: string
  department: string
}
export interface UpdateClassThunkRequest {
  classId: string
  name: string
  department: string
}
export interface UpdateClassThunkResponse extends StandardResponse {
  data: Class
}
//
export interface DeleteClassThunkRequest {
  classId: string
}
export interface DeleteClassThunkResponse extends StandardResponse {
  _id: string
}

// ----->> PROFILE <<-----
export interface GetAllProfileThunkResponse extends StandardResponse {
  data: Profile[]
}
//
export interface GetProfileByIdThunkRequest {
  profileId: string
}
export interface GetProfileByIdThunkResponse extends StandardResponse {
  data: Profile
}
//  
export interface CreateProfileThunkRequest {
  firstName: string
  middleName: string
  lastName: string
  gender: GenderType
  birthDate: string
  bloodGroup: string
  address: string
  contact: string
  fatherName: string
  fatherContact: string
  motherName: string
  motherContact: string
}
export interface CreateProfileThunkResponse extends StandardResponse {
  data: Profile
}
//
export interface UpdateProfileAPIPayload {
  firstName: string
  middleName: string
  lastName: string
  gender: GenderType
  birthDate: string
  bloodGroup: string
  address: string
  contact: string
  fatherName: string
  fatherContact: string
  motherName: string
  motherContact: string
}
export interface UpdateProfileThunkRequest extends UpdateProfileAPIPayload {
  profileId: string
}
export interface UpdateProfileThunkResponse extends StandardResponse {
  data: Profile
}
//
export interface DeleteProfileThunkRequest {
  profileId: string
}
export interface DeleteProfileThunkResponse extends StandardResponse {
  _id: string
}