import { request } from '@/utils/request'

export interface Thanks {
  id: string
  createTime: string
  updateTime: string
  content: string
}

interface ThanksResponse {
  records: Thanks[]
  total: number
}

export function qryThanks(pn: number, ps: number) {
  return request<ThanksResponse>({
    url: '/web/thanksMessage/list',
    method: 'GET',
    params: {
      current: pn,
      size: ps,
    }
  })
}

export function publishThank(content: string) {
  return request<{
    msg: string
    code: number
    success: boolean
  }>({
    url: '/web/thanksMessage/save',
    method: 'POST',
    data: {
      content,
    },
  })
}
