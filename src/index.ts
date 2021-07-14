import { debounce } from './utils/debounce'
import { AxiosInstance } from 'axios'
import { onChange, onClick, onInput, onLoad } from './events'
import { createId } from './utils/createId'
import { getLocalEvents } from './utils/local'

export default class HDVEC {
  id!: string
  name!: string
  instance?: null | HDVEC // 实例
  apiUrl!: string // 接口地址
  interval?: number // 发送间隔
  events!: EventData[]
  fetch!: AxiosInstance
  eventsMap!: { [key: string]: (e: any, vec: HDVEC) => void }
  index: number = 0
  lock: boolean = false
  debounce: boolean = false
  timeout: number = 1e4

  constructor() {
    // 事件
    this.eventsMap = {
      load: onLoad,
      input: onInput,
      click: onClick,
      change: onChange,
    }
  }

  // 创建实例
  init(parameters: HDVECProps) {
    if (this.instance) return
    this.name = parameters.name || 'HD_EVENT_CENTER'
    this.id = createId(this.name)
    this.apiUrl = parameters.apiUrl
    this.interval = parameters.interval || 300
    this.timeout = parameters.timeout || 1e4
    this.events = getLocalEvents(this.id)
    this.bindEvent()
    this.fetch = window.axios
    this.instance = this
    return
  }

  // 全局事件绑定
  bindEvent() {
    Object.keys(this.eventsMap).forEach(event => {
      window.addEventListener(
        event,
        e => {
          this.eventsMap[event](e, this)
          e.stopPropagation()
        },
        false
      )
    })
  }

  // TODO 定时任务
  scheduledTask() {}

  // 推送成功
  pushSuccess() {
    // 切割数组 调整指针位置 把锁打开
    this.events.splice(0, this.index + 1)
    this.index = this.events.length - 1
    this.lock = false
    console.log(this.events)
  }

  // 推送失败
  pushError(e: Error) {
    console.error(e)
  }

  // 调用接口
  push() {
    // 锁定指针
    this.lock = true
    this.fetch
      .post(this.apiUrl, this.events, { timeout: this.timeout })
      .then(() => this.pushSuccess())
      .catch(e => this.pushError(e))
  }

  // TODO 保存事件
  dispatch(type: EventType, data: EventData) {
    this.events.push({ id: +new Date(), type, data, timestamp: +new Date() })
    if (!this.lock) {
      this.index = this.events.length - 1
    }
    this.push()
  }
}
