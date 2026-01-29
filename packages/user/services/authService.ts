import axios from 'axios'
import config from '@/config'

const api = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on unauthorized
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      // Redirect to login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export interface UserGroup {
  id: number
  name: string
  description: string | null
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  email_verified: boolean
  created_at: string
  updated_at: string
  user_groups?: UserGroup[]
}

export interface LoginCredentials {
  email: string
  password: string
  device_name?: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  password_confirmation: string
  device_name?: string
}

export interface LoginResponse {
  user: User
  token: string
  token_type: string
}

export interface AuthError {
  message: string
  errors?: {
    [key: string]: string[]
  }
}

export const authService = {
  /**
   * Login user and store token
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/admin/auth/login', {
        ...credentials,
        device_name: credentials.device_name || 'web_browser'
      })

      const { token, user } = response.data

      // Store token and user
      localStorage.setItem('auth_token', token)
      localStorage.setItem('auth_user', JSON.stringify(user))

      return response.data
    } catch (error: any) {
      throw error.response?.data || { message: 'Login failed' }
    }
  },

  /**
   * Register new user
   */
  async register(credentials: RegisterCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/admin/auth/register', {
        ...credentials,
        device_name: credentials.device_name || 'web_browser'
      })

      const { token, user } = response.data

      // Store token and user
      localStorage.setItem('auth_token', token)
      localStorage.setItem('auth_user', JSON.stringify(user))

      return response.data
    } catch (error: any) {
      throw error.response?.data || { message: 'Registration failed' }
    }
  },

  /**
   * Send password reset email
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>('/admin/auth/forgot-password', {
        email
      })

      return response.data
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to send password reset email' }
    }
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, email: string, password: string, password_confirmation: string): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>('/admin/auth/reset-password', {
        token,
        email,
        password,
        password_confirmation
      })

      return response.data
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to reset password' }
    }
  },

  /**
   * Logout user and clear token
   */
  async logout(): Promise<void> {
    try {
      await api.post('/api/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Always clear local data
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
  },

  /**
   * Get current authenticated user
   */
  async me(): Promise<User> {
    const response = await api.get<{ data: User }>('/api/auth/me')
    const user = response.data.data

    // Update stored user
    localStorage.setItem('auth_user', JSON.stringify(user))

    return user
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token')
  },

  /**
   * Get stored user from localStorage
   */
  getStoredUser(): User | null {
    const userStr = localStorage.getItem('auth_user')
    if (!userStr) return null

    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  },

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token')
  },
}

export default authService
