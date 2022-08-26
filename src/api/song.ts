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

//相似歌曲
export const getSongSimi = (data: { id: number }) => {
  return request({
    url: '/simi/song',
    method: 'GET',
    data
  })
}

//检查音乐是否可用
export const checkMusic = (data: { id: number }) => {
  return request({
    url: '/check/music',
    method: 'GET',
    data
  })
}

//获取热门评论
export const getHotCommentData = (data: { id: number; type: number }) => {
  return request({
    url: '/comment/hot',
    method: 'GET',
    data
  })
}

//获取歌曲评论
export const getSongComment = (id: number, limit = 20, offset: number) => {
  return request({
    url: '/comment/music',
    method: 'GET',
    data: { id, limit, offset, timestamp: new Date().getTime() }
  })
}
