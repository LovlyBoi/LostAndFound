export interface TBaseMessageDTO {
  id: string
  createTime: string
  updateTime: string
  title: string
  delFlag: number
  content: string
  photo1: string
  contactName: string
  contactPhone: string
  status: number
}

export class BaseMessageDTO implements TBaseMessageDTO {
  constructor(
    public id: string,
    public createTime: string,
    public updateTime: string,
    public title: string,
    public delFlag: number,
    public content: string,
    public photo1: string,
    public contactName: string,
    public contactPhone: string,
    public status: number
  ) {}

  static from(item: TBaseMessageDTO): BaseMessageDTO {
    return new BaseMessageDTO(
      item.id,
      item.createTime,
      item.updateTime,
      item.title,
      item.delFlag,
      item.content,
      item.photo1,
      item.contactName,
      item.contactPhone,
      item.status
    )
  }
}
