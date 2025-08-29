import React, { useState } from 'react'
import Button from './Button'
import Input from './Input'
import api from '../api'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await api.loginAdmin({ email, password })
      console.log('Login result:', result)
      if (result.status === 'ok') {
        console.log('Login successful, calling onLogin with:', result.user)
        onLogin(result.user)
      } else {
        console.log('Login failed:', result.message)
        setError(result.message || 'Invalid credentials')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-zinc-700">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:(from-white to-slate-300) bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <p className="text-gray-600 dark:text-zinc-400 mt-2">Sign in to manage your store</p>
          </div>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-4 text-lg"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-8 p-4 bg-gray-50 dark:bg-zinc-700/50 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-zinc-400 font-medium mb-2">
              Default Admin Credentials:
            </p>
            <p className="text-xs text-gray-500 dark:text-zinc-500">
              Email: admin@urbanthreads.com<br/>
              Password: admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
