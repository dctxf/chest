// 生成事件的唯一id
export const createId = (prefix: string): string => {
  return `${prefix}_${+new Date()}`
}
