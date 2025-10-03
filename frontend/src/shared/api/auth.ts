import axios from 'axios'
import type { IRefreshTokenResponse } from '../interfaces'
import api from '@/services/axios'

export async function getNewAccessToken(): Promise<string> {
  const response = await axios.post<IRefreshTokenResponse>(
    'http://localhost:3000/auth/refresh',
    {},
    {
      withCredentials: true,
    },
  )

  return response.data.accessToken
}

export async function logout() {
  return await api.post('auth/logout')
}
