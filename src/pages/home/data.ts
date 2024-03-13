import mockData from './mock.json'
import { BaseMessageDTO } from '../../type'

const baseMessageDTO: BaseMessageDTO[] = mockData.records.map((item) =>
  BaseMessageDTO.from(item),
)

export async function getLostAndFoundMessages() {
  return baseMessageDTO
}
