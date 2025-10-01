import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import type { IUserInfo } from '../interfaces'
import type { ILoginReponse } from '@/modules/auth/interfaces'

export const useUserStore = defineStore(
  'user',
  () => {
    const isAuth = shallowRef<boolean>(false)
    const userInfo = ref<IUserInfo>()
    const accessToken = shallowRef<string>()

    function auth(loginResponse: ILoginReponse) {
      isAuth.value = true
      userInfo.value = {
        surname: loginResponse.surname,
        name: loginResponse.name,
        role: loginResponse.role,
      }
      accessToken.value = loginResponse.accessToken
    }

    return { isAuth, userInfo, auth }
  },
  { persist: true },
)
