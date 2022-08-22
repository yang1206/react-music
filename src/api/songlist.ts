import request from '@/service'
import { SongList } from './interface'
export const getSongListDetail = (data: SongList.SongListDetail) => {
  return request({
    url: '/playlist/detail',
    method: 'GET',
    data
  })
}

//TODO上面的歌单接口只能获取十首，这个接口登陆后可以获取全部接口
export const getSongListAll = (data: SongList.SongListDetail) => {
  return request({
    url: '/playlist/track/all',
    method: 'GET',
    data
  })
}
