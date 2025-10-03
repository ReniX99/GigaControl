import api from '@/services/axios'
import type { IUserForm } from '../interfaces'

export async function sendUserInfo(userInfo: IUserForm) {
  isDataEmpty(userInfo)
  isMatchPassword(userInfo)

  await api.post('users/create', {
    email: userInfo.email,
    password: userInfo.password,
    surname: userInfo.surname,
    name: userInfo.name,
    roleId: userInfo.roleId,
  })
}

function isDataEmpty(userInfo: IUserForm): void {
  const errorMessage: string = 'Заполните все поля'

  Object.values(userInfo).forEach((value: number | string) => {
    if (value === null || value === undefined) {
      throw new Error(errorMessage)
    }
    if (typeof value === 'string' && value === '') {
      throw new Error(errorMessage)
    }
  })
}

function isMatchPassword(userInfo: IUserForm) {
  if (userInfo.password !== userInfo.repeatedPassword)
    throw new Error('Введённые пароли не совпадают')
}
