export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}
