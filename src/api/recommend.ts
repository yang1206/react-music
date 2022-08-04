import request from '@/service'
import { Recommend } from '@/api/interface'
export const getBannerList = (data?: any) => {
  return request({
    url: '/banner',
    method: 'GET',
    data
  })
}
export const getPersonalizedList = (data?: Recommend.SongListParams) => {
  return request({
    url: '/personalized',
    method: 'GET',
    data
  })
}
