import { request } from '@/utils/request'

export interface Thanks {
  id: string
  createTime: string
  updateTime: string
  content: string
}

export function qryThanks() {
  return request<Thanks[]>({
    url: '/web/thanksMessage/list',
    method: 'GET',
  })
}
