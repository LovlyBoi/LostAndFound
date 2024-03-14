import { request } from '@/utils/request'

interface Comment {
  id: string
  createTime: string
  updateTime: string
  foundMessageId: number
  content: string
  user: {
    id: string
    admin: boolean
  }
}

interface CommentResponse {
  records: Comment[]
  total: number
}

export function qryComments(id: string) {
  return request<CommentResponse>({
    url: '/web/comments/list',
    method: 'GET',
    params: {
      foundMessageId: id,
    },
  })
}

export function publishComment(comment: {
  content: string
  foundMessageId: number
}) {
  return request<CommentResponse>({
    url: '/web/comments/save',
    method: 'POST',
    data: comment,
  })
}
