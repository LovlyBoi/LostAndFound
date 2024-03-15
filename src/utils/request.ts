import axios, { AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store/userStore'

const instance = axios.create({
  timeout: 60 * 1000,
  baseURL: import.meta.env.VITE_AXIOS_BASEURL,
})

instance.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    Object.assign(config.headers, {
      token: userStore.token,
    })
  }
  return config
})

instance.interceptors.response.use((response) => {
  if (response.status === 408 || response.status === 401) {
    window.$message.error('登录过期，请重新登陆');
    const userStore = useUserStore()
    userStore.logout()
  }
  return response
})

async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const { data } = await instance.request<T>(config)
  return data
}

export { request }
