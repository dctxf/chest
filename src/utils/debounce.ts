export const debounce = (fn: any, timeout: number) => {
  let timer: any = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, arguments)
    }, timeout)
  }
}
