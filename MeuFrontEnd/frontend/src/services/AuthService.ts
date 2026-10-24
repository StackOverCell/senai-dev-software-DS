import api from './api'
import type { LoginRequest, LoginResponse } from '../types/Auth'

export const authService = {
  login: async (req: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/api/auth/login', req)
    return data
  }
}