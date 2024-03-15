<template>
  <div class="">
    <div
      class="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8"
    >
      <div class="w-full max-w-md space-y-8">
        <div>
          <img class="w-auto h-12 mx-auto" :src="tailwindSvg" />
          <h2
            class="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900"
          >
            登录
          </h2>
          <p class="mt-2 text-sm text-center text-gray-600">
            片刻后生成 平衡 忠诚 不息的身体
          </p>
        </div>
        <ValidateProvider ref="validateRef">
          <form class="mt-8 space-y-6">
            <div class="-space-y-px rounded-md shadow-sm">
              <div>
                <label for="username" class="sr-only">用户名</label>
                <ValidateInput
                  ref="usernameInputRef"
                  v-model.trim="username"
                  normal-class="ring-gray-300"
                  error-class="z-10 ring-red-600 focus:ring-red-600 ring-2"
                  :rule="usernameRule"
                  id="username"
                  name="username"
                  type="text"
                  autocomplete="username"
                  class="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6 outline-none"
                  placeholder="用户名"
                >
                </ValidateInput>
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <ValidateInput
                  ref="passwordInputRef"
                  normal-class="ring-gray-300"
                  error-class="z-10 ring-red-600 focus:ring-red-600 ring-2"
                  :rule="passwordRule"
                  v-model.trim="password"
                  trigger="blur"
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  class="relative block w-full border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  placeholder="密码"
                >
                </ValidateInput>
              </div>
              <div>
                <label for="password-again" class="sr-only">Password</label>
                <ValidateInput
                  v-model.trim="verifyCode"
                  :rule="verifyCodeRule"
                  trigger="blur"
                  animate-on-invalid
                  normal-class="ring-gray-300"
                  error-class="z-10 ring-red-600 focus:ring-red-600 ring-2"
                  class="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  placeholder="验证码"
                />
              </div>
            </div>

            <div class="flex flex-row-reverse items-center justify-between">
              <div
                class="text-sm bg-slate-100 w-[160px] h-[50px] overflow-hidden rounded cursor-pointer"
                @click="getVerifyImg"
              >
                <img class="object-fill w-full" :src="verifyImg" />
              </div>
            </div>

            <div>
              <button
                @click.prevent="handleLogin"
                class="relative flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md group hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                登录
              </button>
            </div>
          </form>
        </ValidateProvider>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ValidateInput, {
  ValidateInputInstance,
} from '@/components/Validater/ValidateInput.vue'
import ValidateProvider from '@/components/Validater/ValidateProvider.vue'
import { useUserStore } from '@/store/userStore'
import tailwindSvg from '@/assets/tailwind.svg'
import { getVerfiyCode } from '@/api'

const verifyImg = ref('')

const router = useRouter()

const userStore = useUserStore()

const username = ref('')
const password = ref('')
const verifyCode = ref('')
const verifyCodeId = ref('')

const validateRef = ref<InstanceType<typeof ValidateProvider>>()

const usernameInputRef = ref<ValidateInputInstance>()
const passwordInputRef = ref<ValidateInputInstance>()

const handleLogin = async () => {
  const result = await validateRef.value?.validateAll()
  if (!result) return
  try {
    await userStore.login(
      username.value,
      password.value,
      verifyCode.value,
      verifyCodeId.value,
    )
    router.push('/')
  } catch (error: any) {
    console.error(error)
    if (error?.status === 403) {
      passwordInputRef.value?.shake('密码错误')
    } else if (error?.status === 406) {
      usernameInputRef.value?.shake('该用户名尚未注册')
    }
  }
}

const usernameRule = (value: string) => {
  if (value === '')
    return {
      isValid: false,
      msg: '用户名字段是必须的',
    }
  const pattern = /^([A-Za-z0-9_\u4e00-\u9fa5]{4,16})/
  if (!pattern.test(value)) {
    return {
      isValid: false,
      msg: '用户名格式错误(4~16位字母、汉字、数字、下划线)',
    }
  }
  return { isValid: true }
}

const passwordRule = (value: string) => {
  if (value === '')
    return {
      isValid: false,
      msg: '密码名字段是必须的',
    }
  if (value.length < 6) return { isValid: false, msg: '密码长度不能小于6' }
  return { isValid: true }
}

const verifyCodeRule = (value: string) => {
  if (value === '') {
    return {
      isValid: false,
      msg: '验证码字段是必须的',
    }
  }
  return { isValid: true }
}

async function getVerifyImg() {
  const res = await getVerfiyCode()
  verifyImg.value = 'data:image/jpeg;base64,' + res.codeImg
  verifyCodeId.value = res.uuid
}

getVerifyImg()
</script>
