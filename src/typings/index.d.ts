// 事件中心
declare type HDVECProps = {
  apiUrl: string
  interval?: number // 发送间隔
  timeout?: number
  name?: string
}
// 事件类型
declare type EventType = 'input' | 'click' | string

// 事件数据
declare type EventData = {
  id: number
  type: EventType
  data: { [key: string]: any }
  timestamp: number
}

declare interface Window {
  axios: import('axios').AxiosInstance
}
