import api from '@/services/axios'
import type { IUser } from '../interfaces'

export async function getUsers(): Promise<IUser[]> {
  const response = await api.get<IUser[]>('users')

  return response.data
}
