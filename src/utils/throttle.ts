export const throttle = (fn: any, time: number) => {
  let flag = true
  return function () {
    if (!flag) return
    flag = false
    setTimeout(() => {
      // @ts-ignore
      fn.apply(this, arguments)
      flag = true
    }, time)
  }
}
