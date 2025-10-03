import { useUserStore } from '@/shared/stores/user-store'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import router from './router'

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

let isRefreshing = false
let failedQueue: any[] = []

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const userStore = useUserStore()

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const newToken = await userStore.refreshToken()

        processQueue(null, newToken)

        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)

        await userStore.exit()
        router.push({ name: '/auth/login' })

        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default api
