import api from '@/services/axios'
import type { IProjectInfo } from '../interfaces'

export async function getProjects(): Promise<IProjectInfo[]> {
  const response = await api.get<IProjectInfo[]>('projects')

  return response.data
}
