import request from '@/service'
type Param = {
  keywords: string
  limit: number
  type: string
}
export const getSearch = (data: Param) => {
  return request({
    url: '/search',
    method: 'GET',
    data
  })
}
