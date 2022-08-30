import request from '@/service'
//歌手详细信息
export const getArtists = (id: number | string) => {
  return request({
    url: '/artists',
    method: 'GET',
    data: {
      id
    }
  })
}

//歌手介绍
export const getArtistsDesc = (id: number | string) => {
  return request({
    url: '/artist/desc',
    method: 'GET',
    data: {
      id
    }
  })
}

//歌手专辑
export const getArtistsAlbum = (id: number | string) => {
  return request({
    url: '/artist/album',
    method: 'GET',
    data: {
      id
    }
  })
}

//歌手列表
// type 取值:

// -1:全部
// 1:男歌手
// 2:女歌手
// 3:乐队

// area 取值:

// -1:全部
// 7华语
// 96欧美
// 8:日本
// 16韩国
// 0:其他
export const getArtistsList = (
  type?: number | string,
  area?: number | string,
  cat?: number | string,
  offset?: number,
  initial?: string,
  limit = 16
) => {
  return request({
    url: '/artist/list',
    method: 'GET',
    data: {
      type,
      area,
      cat,
      offset,
      initial,
      limit
    }
  })
}
