import { isIdCardNo } from './../src/utils/isIdCardNo'

const ids1 = ['410182198910106596']
const ids2 = ['2', '', '410182198910106597']

ids1.forEach(key => {
  test(`${key} :`, () => {
    expect(isIdCardNo(key)).toBeTruthy()
  })
})
ids2.forEach(key => {
  test(`${key} :`, () => {
    expect(isIdCardNo(key)).toBeFalsy()
  })
})
