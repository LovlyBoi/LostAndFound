import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const username = ref('')
  const token = ref('')
  const isAdmin = ref(false)

  async function login(
    userName: string,
    passWord: string,
    verifyCode: string,
    verifyCodeId: string,
  ) {
    console.log('Logging in...', userName, passWord, verifyCode, verifyCodeId)
    username.value = userName
    token.value = '123'
    isAdmin.value = true
  }

  async function register(userName: string, password: string) {
    console.log('Logging in...', userName, password)
    username.value = userName
    token.value = '123'
  }

  return {
    username,
    token,
    login,
    register,
  }
})
