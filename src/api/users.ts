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
    data: { username, password, verifyCode, verifyCodeId },
  })
  return {
    ...res,
    username,
  }
}

export function register(username: string, password: string) {
  return request<LoginResponse>({
    url: '/sys/user/saveNormal',
    method: 'POST',
    data: { username, password },
  })
}

export function getVerfiyCode() {
  return request<VerifyCodeResponse>({
    url: '/api/sys/getCode',
    method: 'GET',
  })
}
