import { request } from '@/utils/request'

interface MessageRecord {
  id: string
  createTime: string
  updateTime: string
  title: string
  content: string
  contactName: string
  contactPhone: string
  status: number
  type: 0 | 1
}

interface MessageResponse {
  records: MessageRecord[]
  total: number
}

interface MessagePost {
  title: string
  content: string
  contactName: string
  contactPhone: string
  phone: string[]
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
