import { request } from '@/utils/request'

interface AnnouncementRecord {
  id: string
  title: string
  content: string
  createTime: string
  updateTime: string
  type: string
}

interface AnnouncementResponse {
  records: AnnouncementRecord[]
  total: number
}

export function qryAnnouncements() {
  return request<AnnouncementResponse>({
    url: '/notify/list',
    method: 'GET',
  })
}
