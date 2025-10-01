import api from '@/services/axios'
import type { ILoginForm, ILoginReponse } from '../../interfaces/auth'
import { useUserStore } from '@/shared/stores/user-store'

export async function submitForm(form: ILoginForm) {
  if (form.email === undefined || form.password === undefined) {
    throw new Error('Заполните все поля')
  }

  const resposne = await api.post<ILoginReponse>('auth/login', { ...form })

  const userStore = useUserStore()
  userStore.auth(resposne.data)
}
