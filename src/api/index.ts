import request from '@/service'

export const getBannerList = (data?: any) => {
  return request({
    url: '/banner',
    method: 'GET',
    data
  })
}
