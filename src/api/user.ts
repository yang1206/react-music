import request from '../service'

//获取用户歌单
export const gotoUserSongList = (uid: string) => {
  return request({
    url: '/user/playlist',
    method: 'GET',
    params: {
      uid,
      timestamp: new Date().getTime()
    }
  })
}

//创建歌单
export const CreateSongList = (name: string, cookie: string) => {
  return request({
    url: '/playlist/create',
    method: 'GET',
    params: {
      name,
      cookie
    }
  })
}

//获取用户信息
export const getUserInfo = (cookie: string) => {
  return request({
    url: '/user/subcount',
    method: 'GET',
    params: {
      cookie
    }
  })
}
