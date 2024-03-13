import { BaseMessageDTO } from '@/type'
import mockData from './mock.json'

export async function getMessageDetail(id: string): Promise<BaseMessageDTO> {
  console.log('id', id)
  return mockData
}
