import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { register as registerApi, login as loginApi } from '@/api'

export const useUserStore = defineStore('userStore', () => {
  const router = useRouter()

  const username = ref(getCache('username') || '')
  const token = ref(getCache('token') || '')

  function setCache(key: string, value: unknown) {
    let s
    try {
      s = JSON.stringify(value)
    } catch (e) {
      s = 'null'
    }
    localStorage.setItem(key, s)
  }

  function getCache(key: string) {
    return JSON.parse(localStorage.getItem(key) || 'null')
  }

  async function login(
    userName: string,
    passWord: string,
    verifyCode: string,
    verifyCodeId: string,
  ) {
    const res = await loginApi(userName, passWord, verifyCode, verifyCodeId)

    username.value = res.username
    token.value = res.token

    setCache('username', res.username)
    setCache('token', res.token)
  }

  async function register(userName: string, password: string) {
    const res = await registerApi(userName, password)

    username.value = res.username
    token.value = res.token

    setCache('username', res.username)
    setCache('token', res.token)
  }

  async function logout() {
    username.value = ''
    token.value = ''

    setCache('username', null)
    setCache('token', null)

    router.push('/login')
  }

  return {
    username,
    token,
    login,
    register,
    logout,
  }
})
