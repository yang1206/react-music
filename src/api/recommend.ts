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
//新碟上架
export const getTopAlbums = (data?: Recommend.TopAlbums) => {
  return request({
    url: '/top/album',
    method: 'GET',
    data
  })
}
//全部新碟
export const getNewAlbums = (area: string = 'ALL', limit?: number, offset?: any) => {
  return request({
    url: '/album/new',
    method: 'GET',
    data: {
      area,
      limit,
      offset
    }
  })
}
//首页热门新碟
export const getNewestAlbums = (data?: Recommend.NewAlbums) => {
  return request({
    url: '/album/newest',
    method: 'GET',
    data
  })
}
export const getTopList = (data?: Recommend.TopList) => {
  return request({
    url: '/top/list',
    method: 'GET',
    data
  })
}
//获取歌单详情，同时也是获取排行榜的接口
export const getPlaylist = (data: Recommend.Playlist) => {
  return request({
    url: '/playlist/detail',
    method: 'GET',
    data
  })
}
//获取全部榜单
export const getAllTopList = (id: number | string) => {
  return request({
    url: '/toplist',
    method: 'GET',
    data: {
      id
    }
  })
}

//获取每日推荐歌曲
export const getRecommendsongs = () => {
  return request({
    url: '/recommend/songs',
    method: 'GET'
  })
}
