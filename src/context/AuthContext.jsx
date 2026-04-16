import { createContext, useState, useContext } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (email, password) => {
    // Simulate login — accept any non-empty credentials
    if (email && password) {
      setUser({ name: 'Alex Morgan', email, avatar: null, joinDate: '2024-01-15' })
      return true
    }
    return false
  }

  const signup = (name, email, password) => {
    if (name && email && password) {
      setUser({ name, email, avatar: null, joinDate: new Date().toISOString() })
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
