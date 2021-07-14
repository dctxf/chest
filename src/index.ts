import { createId } from './utils/createId'
import { getLocalEvents } from './utils/local'

export default class HDVEC {
  id!: string
  name!: string
  instance?: null | HDVEC // 实例
  apiUrl!: string // 接口地址
  interval?: number // 发送间隔
  events!: EventData[]
  fetch: null | any

  constructor() {}

  // TODO 创建实例
  init(parameters: HDVECProps) {
    if (this.instance) return
    this.name = parameters.name || 'HD_EVENT_CENTER'
    this.id = createId(this.name)
    this.apiUrl = parameters.apiUrl
    this.interval = parameters.interval || 300
    this.events = getLocalEvents(this.id)
    this.fetch = window.axios
    this.instance = this
    return
  }

  // TODO 调用接口
  push(data: EventData[]) {
    this.fetch.post(this.apiUrl, data)
  }

  // TODO 保存事件
  dispatch(type: EventType, event: EventData) {
    console.log(type, event)
  }
}
