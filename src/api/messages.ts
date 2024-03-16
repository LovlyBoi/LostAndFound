import { request } from '@/utils/request'

export interface MessageRecord {
  id: string
  createTime: string
  updateTime: string
  title: string
  content: string
  contactName: string
  contactPhone: string
  status: number
  type: 0 | 1
  photos: string[]
}

interface MessageResponse {
  records: MessageRecord[]
  total: number
}

interface MessagePost {
  type: '0' | '1'
  title: string
  content: string
  contactName: string
  contactPhone: string
  photos: string[]
}

type BaseResponse = {
  msg: string
  code: number
  success: boolean
}

export function qryMessage(pn: number, ps: number) {
  return request<MessageResponse>({
    url: '/web/foundMessage/list',
    method: 'GET',
    params: {
      current: pn,
      size: ps,
    },
  })
}

export function searchMessage(query: string) {
  return request<MessageResponse>({
    url: '/web/foundMessage/list',
    method: 'GET',
    params: {
      query,
    },
  })
}

export function qryMessageById(id: string) {
  return request<MessageRecord>({
    url: '/web/foundMessage/queryById',
    method: 'GET',
    params: {
      id,
    },
  })
}

export function publishMessage(message: MessagePost) {
  return request<BaseResponse>({
    url: '/web/foundMessage/save',
    method: 'POST',
    data: message,
  })
}
