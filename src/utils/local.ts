// 获取本地
export const getLocalEvents = (key: string) => {
  const eventsStr = window.sessionStorage.getItem(key)
  try {
    return eventsStr ? JSON.parse(eventsStr) : []
  } catch (error) {
    throw new Error('解析缓存失败')
  }
}
// 保存到本地
export const setLocalEvents = (key: string, events: any) => {
  window.sessionStorage.setItem(key, JSON.stringify(events))
}
