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

export interface User {
  id?: number
  name: string
  email: string
  email_verified_at?: string | null
  email_verified?: boolean
  created_at?: string
  updated_at?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  filters?: {
    search?: string
    sort?: string
    direction?: string
  }
}

export const userService = {
  getAll(params?: { search?: string; sort?: string; direction?: string; page?: number }) {
    return api.get<PaginatedResponse<User>>('/api/admin/user/users', { params })
  },
  getById(id: number | string) {
    return api.get<User>(`/api/admin/user/users/${id}`)
  },
  create(user: User) {
    return api.post<User>('/api/admin/user/users', user)
  },
  update(id: number | string, user: User) {
    return api.put<User>(`/api/admin/user/users/${id}`, user)
  },
  delete(id: number | string) {
    return api.delete(`/api/admin/user/users/${id}`)
  },
}
