import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const username = ref('')
  const token = ref('')

  async function login(username: string, password: string) {
    console.log('Logging in...', username, password)
  }

  async function register(username: string, password: string) {
    console.log('Logging in...', username, password)
  }

  return {
    username,
    token,
    login,
    register,
  }
})
