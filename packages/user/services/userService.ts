import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

export const userService = {
  getAll() {
    return api.get<User[]>('/users');
  },
  getById(id: number | string) {
    return api.get<User>(`/users/${id}`);
  },
  create(user: User) {
    return api.post<User>('/users', user);
  },
  update(id: number | string, user: User) {
    return api.put<User>(`/users/${id}`, user);
  },
  delete(id: number | string) {
    return api.delete(`/users/${id}`);
  },
};
