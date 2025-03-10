import { User } from "../thunks/dashboard";

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
}