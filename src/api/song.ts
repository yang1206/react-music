import request from '@/service'
import { Song } from './interface'
export const getSongDetail = (data: Song.SongDetail) => {
  return request({
    url: '/song/detail',
    method: 'GET',
    data
  })
}

export const getLyricData = (data: { id: number }) => {
  return request({
    url: '/lyric',
    method: 'GET',
    data
  })
}

export const getSongSimi = (data: { id: number }) => {
  return request({
    url: '/simi/song',
    method: 'GET',
    data
  })
}
