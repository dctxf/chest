import HDVEC from '..'

// TODO 页面加载
export const onLoad = (e: Event, vec: HDVEC) => {
  // console.log(e, vec)
}
// TODO 输入框
export const onInput = (e: InputEvent, vec: HDVEC) => {
  // const ie = e as InputEvent
}
// TODO 页面点击
export const onClick = (e: MouseEvent, vec: HDVEC) => {
  const et = e.target as any
  if (et.tagName === 'BUTTON') {
    // console.log(et.innerText)
  }
}
// TODO change事件
export const onChange = (e: Event, vec: HDVEC) => {
  // console.log(e)
}
