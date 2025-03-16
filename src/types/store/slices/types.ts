import { Class, Department, Institute, Update, User } from "@/types/store/thunks/dashboard";

// Auth Slice
export interface AuthState {
  user: {
    email: string | null,
    role: string | null,
  }
  token: string | null
}


// General Slice
export type Theme = 'light' | 'dark';

export interface GeneralState {
  theme: Theme;
}

// Dashboard Slice
export interface DashboardState {
  users: User[]
  selectedUser: User | null
  institutes: Institute[]
  selectedInstitute: Institute | null
  updates: Update[]
  selectedUpdate: Update | null
  departments: Department[]
  selectedDepartment: Department | null
  classes: Class[]
  selectedClass: Class | null
}