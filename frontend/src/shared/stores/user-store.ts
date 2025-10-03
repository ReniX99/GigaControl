import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import type { IUserInfo } from '../interfaces'
import type { ILoginReponse } from '@/modules/auth/interfaces'
import { getNewAccessToken, logout } from '../api'

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

    async function refreshToken(): Promise<string> {
      const newToken = await getNewAccessToken()

      accessToken.value = newToken
      return newToken
    }

    async function exit() {
      await logout()

      isAuth.value = false
      userInfo.value = undefined
      accessToken.value = ''
    }

    return { isAuth, userInfo, accessToken, auth, refreshToken, exit }
  },
  { persist: true },
)
