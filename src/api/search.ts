import request from '@/service'
type Param = {
  keywords: string
  limit: number
  type: number
}
export const getSearch = (data: Param) => {
  return request({
    url: '/search',
    method: 'GET',
    data
  })
}
