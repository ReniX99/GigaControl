import api from '@/services/axios'
import type { IProjectForm } from '../interfaces'

export async function sendProjectForm(projectForm: IProjectForm): Promise<number> {
  isValid(projectForm)

  const response = await api.post<number>('projects', projectForm)

  return response.data
}

function isValid(projectForm: IProjectForm) {
  if (projectForm.title === '' || projectForm.title === null || projectForm.title == undefined) {
    throw new Error('Заполните все поля')
  }
}
