import api from '@/services/axios'
import type { IRole } from '../interfaces/role'

export async function getRoles(): Promise<IRole[]> {
  const response = await api.get<IRole[]>('roles')

  return response.data
}
