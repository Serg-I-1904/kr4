import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useLocalStorage('tech-auth', { isAuthenticated: false, user: null })

  const login = (username, password) => {
    if (username === 'admin' && password === 'password') {
      setAuthState({ isAuthenticated: true, user: { name: 'admin' } })
      return true
    }
    return false
  }

  const logout = () => setAuthState({ isAuthenticated: false, user: null })

  const value = {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth должен использоваться внутри AuthProvider')
  }
  return ctx
}


