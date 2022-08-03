import request from '@/service'
import { SongListParams } from '@/api/interface'
export const getBannerList = (data?: any) => {
  return request({
    url: '/banner',
    method: 'GET',
    data
  })
}
export const getPersonalizedList = (data?: SongListParams) => {
  return request({
    url: '/personalized',
    method: 'GET',
    data
  })
}
