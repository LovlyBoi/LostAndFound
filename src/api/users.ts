import { request } from '@/utils/request'

interface LoginResponse {
  token: string
  username: string
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
): Promise<LoginResponse> {
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

export async function register(username: string, password: string) {
  const res = await request<LoginResponse>({
    url: '/sys/user/saveNormal',
    method: 'POST',
    data: { loginName: username, password },
  })
  return {
    ...res,
    username,
  }
}

export function getVerfiyCode() {
  return request<VerifyCodeResponse>({
    url: '/api/sys/getCode',
    method: 'GET',
  })
}
