// 事件中心
declare type HDVECProps = {
  apiUrl: string
  interval?: number // 发送间隔
  name?: string
}
// 事件类型
declare type EventType = {}

// 事件数据
declare type EventData = {}

declare interface Window {
  axios: import('axios').AxiosInstance
}
