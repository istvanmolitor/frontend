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

export interface ContentElement {
  id: number
  type: string
  content: any
}

export interface Content {
  id: number
  elements: ContentElement[]
}

export interface Page {
  id?: number
  title: string
  slug: string
  content?: Content | null
  created_at?: string
  updated_at?: string
}

export interface PageFormData {
  title: string
  slug: string
}

export interface SingleResponse<T> {
  data: T
}

export interface ListResponse<T> {
  data: T[]
}

export const pageService = {
  getAll() {
    return api.get<ListResponse<Page>>('/api/cms/pages')
  },
  getById(id: number | string) {
    return api.get<SingleResponse<Page>>(`/api/cms/pages/${id}`)
  },
  getBySlug(slug: string) {
    return api.get<SingleResponse<Page>>(`/api/cms/slug/${slug}`)
  },
  create(page: PageFormData) {
    return api.post<SingleResponse<Page>>('/api/cms/pages', page)
  },
  update(id: number | string, page: PageFormData) {
    return api.put<SingleResponse<Page>>(`/api/cms/pages/${id}`, page)
  },
  delete(id: number | string) {
    return api.delete(`/api/cms/pages/${id}`)
  },
}
