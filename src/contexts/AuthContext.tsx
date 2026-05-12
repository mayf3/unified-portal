import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { AuthState, User } from '../api/types'
import { login as apiLogin } from '../api/client'

const TOKEN_KEY = 'portal_token'
const USER_KEY = 'portal_user'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(USER_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY)
  })

  const isAuthenticated = !!token && !!user

  const login = useCallback(async (email: string, password: string) => {
    const result = await apiLogin({ email, password })
    const tokenStr = result.accessToken
    const userData: User = result.user

    localStorage.setItem(TOKEN_KEY, tokenStr)
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
    setToken(tokenStr)
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
