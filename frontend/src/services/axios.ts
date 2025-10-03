import { useUserStore } from '@/shared/stores/user-store'
import axios from 'axios'
import { storeToRefs } from 'pinia'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const { accessToken } = storeToRefs(userStore)

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken.value}`
  }

  return config
})

export default api
