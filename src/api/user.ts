import request from '../service'
//登陆后可调用的接口

//获取用户歌单
export const gotoUserSongList = (data: { uid: string }) => {
  return request({
    url: '/user/playlist',
    method: 'GET',
    data
  })
}

//创建歌单
export const CreateSongList = (data: { name: string }) => {
  return request({
    url: '/playlist/create',
    method: 'GET',
    data
  })
}

export const subscribeSongList = (data: { id: string | number; t: number }) => {
  return request({
    url: '/playlist/subscribe',
    method: 'GET',
    data
  })
}

export const deleteSongList = (data: { id: string | number }) => {
  return request({
    url: '/playlist/delete',
    method: 'GET',
    data
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
