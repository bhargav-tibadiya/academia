export interface AuthState {
  user: {
    email: string | null,
    role: string | null,
  }
  token: string | null
}