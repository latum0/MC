"use client"

import { createContext, useState, useEffect, useContext } from "react"
import authService from "../services/authService.jx"


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setLoading(false)
  }, [])

  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      const data = await authService.register(userData)
      setUser(data.utilisateur)
      return data
    } catch (err) {
      setError(err.error || "Erreur lors de l'inscription")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      setLoading(true)
      setError(null)
      const data = await authService.login(credentials)
      setUser(data.utilisateur)
      return data
    } catch (err) {
      setError(err.error || "Erreur lors de la connexion")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const updateProfile = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      const updatedUser = await authService.updateProfile(userData)
      setUser(updatedUser)
      return updatedUser
    } catch (err) {
      setError(err.error || "Erreur lors de la mise à jour du profil")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
