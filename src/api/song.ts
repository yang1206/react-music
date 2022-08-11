import request from '@/service'
import { Song } from './interface'
export const getSongDetail = (data: Song.SongDetail) => {
  return request({
    url: '/song/detail',
    method: 'GET',
    data
  })
}