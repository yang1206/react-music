import request from '@/service'
interface Param {
  keywords: string
  limit: number
  type: string
}
export const getSearch = (data: Param) => {
  return request({
    url: '/cloudsearch',
    method: 'GET',
    data,
  })
}
