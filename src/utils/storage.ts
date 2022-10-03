import { LOCAL_CURRENT_SONG_INDEX_KEY, LOCAL_PLAYLIST_ID_KEY } from '@/common/constants'
/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export const localGet = (key: string) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key) as string)
  }
  catch (error) {
    return value
  }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export const localSet = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export const localRemove = (key: string) => {
  window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export const localClear = () => {
  window.localStorage.clear()
}

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @return object
 */
export const deepCopy = <T>(obj: any): T => {
  let newObj: any
  try {
    newObj = obj.push ? [] : {}
  }
  catch (error) {
    newObj = {}
  }
  for (const attr in obj) {
    if (typeof obj[attr] === 'object')
      newObj[attr] = deepCopy(obj[attr])
    else
      newObj[attr] = obj[attr]
  }
  return newObj
}

/**
 * @description 本地存储添加歌曲id,如果存在就不再添加
 * @param {Number} id 歌曲id
 * @param {String} key 本地存储key
 */
export function addPlaylistId(id: number | any[], key: string = LOCAL_PLAYLIST_ID_KEY) {
  const songListId = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []
  if (Array.isArray(id)) {
    id.forEach((id) => {
      !songListId.includes(id) && songListId.push(id)
    })
  }
  else if (typeof id === 'number') {
    // 本地存储保存包括不再重复添加
    if (!songListId.includes(id))
      songListId.push(id)
  }
  else {
    throw new TypeError('id只能是数字或者数组类型')
  }
  localStorage.setItem(key, JSON.stringify(songListId))
}

/**
 * @description 获取歌曲列表id
 * @param {String} key
 * @returns {Array} 歌曲列表项id
 */
export function getPlaylistId(key: string = LOCAL_PLAYLIST_ID_KEY): Array<any> {
  const songListId = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []
  return songListId
}

/**
 * @description 删除的歌曲ID
 * @param {Number} id String} id 要删除的歌曲ID
 * @param {String} key
 */
export function removeSongId(id: any, key: string = LOCAL_PLAYLIST_ID_KEY) {
  const songListId = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []
  // 数组有值 & 查找到了要移除的id
  if (songListId.length && songListId.includes(id))
    songListId.splice(songListId.indexOf(id), 1)

  localStorage.setItem(key, JSON.stringify(songListId))
}

/**
 * @description 清除全部歌曲
 * @param {String} key
 */
export function removeAllSong(key: string = LOCAL_PLAYLIST_ID_KEY) {
  const songListId = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []
  // 数组有值 & 查找到了要移除的id
  if (songListId.length)
    songListId.length = 0

  localStorage.setItem(key, JSON.stringify(songListId))
}

/**
 * @description 重置本次存储歌曲列表ID
 * @param {Array} idArr 新歌曲列表数组
 */
export function resetPlaylistId(idArr: Array<any>) {
  removeAllSong()
  idArr && idArr.forEach((id: any) => addPlaylistId(id))
}

// ------记忆当前播放歌曲Index------
/**
 * @description 更新音乐索引
 * @param {Number} index 音乐索引
 * @param {*} key
 */
export function setCurrentSongIndex(index: number, key: any = LOCAL_CURRENT_SONG_INDEX_KEY) {
  localStorage.setItem(key, JSON.stringify(index))
}

/**
 * @description 初始存储
 * @param {Number} index 音乐索引
 * @param {String} key
 */
export function initCurrentSongIndex(index = 0, key: string = LOCAL_CURRENT_SONG_INDEX_KEY) {
  if (!localStorage.getItem(key))
    localStorage.setItem(key, JSON.stringify(index))
}

/**
 * @description 获取歌曲索引
 * @param {String} key
 * @returns 获取歌曲索引
 */
export function getCurrentSongIndex(key = LOCAL_CURRENT_SONG_INDEX_KEY) {
  const currentIndex = JSON.parse(localStorage.getItem(key)) || 0
  return currentIndex
}
