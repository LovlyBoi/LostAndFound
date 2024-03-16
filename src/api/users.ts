import { request } from '@/utils/request'

interface LoginResult {
  username: string
  token: string
}

interface LoginResponse {
  msg: string
  code: number
  data: {
    token: string
  }
  success: boolean
}

interface VerifyCodeResponse {
  codeImg: string
  uuid: string
}

export async function login(
  username: string,
  password: string,
  verifyCode: string,
  verifyCodeId: string,
): Promise<LoginResult> {
  const res = await request<{ token: string }>({
    url: '/api/sys/login',
    method: 'POST',
    data: {
      username,
      password,
      code: verifyCode,
      uuid: verifyCodeId,
    },
  })
  return {
    ...res,
    username,
  }
}

export async function register(
  username: string,
  password: string,
): Promise<LoginResult> {
  const res = await request<LoginResponse>({
    url: '/sys/user/saveNormal',
    method: 'POST',
    data: { loginName: username, password },
  })
  return {
    token: res?.data?.token,
    username,
  }
}

export function getVerfiyCode() {
  return request<VerifyCodeResponse>({
    url: '/api/sys/getCode',
    method: 'GET',
  })
}
