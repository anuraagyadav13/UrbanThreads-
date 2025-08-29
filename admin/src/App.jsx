import React, { useState, useEffect } from "react"
import 'virtual:windi.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import api from './api'

function App() {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if admin is already logged in
    const savedAdmin = api.getAdmin()
    if (savedAdmin) {
      setAdmin(savedAdmin)
    }
    setLoading(false)
  }, [])

  const handleLogin = (adminUser) => {
    setAdmin(adminUser)
  }

  const handleLogout = () => {
    api.logoutAdmin()
    setAdmin(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-zinc-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 dark:border-white"></div>
      </div>
    )
  }

  return (
    <div className="App">
      {admin ? (
        <Dashboard admin={admin} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
