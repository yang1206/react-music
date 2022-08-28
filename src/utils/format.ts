import { RouteObject } from '@/routers/interface'
import { address } from '@/common/localData'
/**
 * @description 播放量转发
 * @param {Number} count 播放量
 * @returns {string | number}
 */
export function getCount(count: number): string | number {
  if (count < 0) return
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万'
  } else {
    return Math.floor(count / 10000000) / 10 + '亿'
  }
}

/**
 * @description 获取指定图片大小链接
 * @param {string} imgUrl 链接
 * @param {number} size 大小
 * @returns {string} 指定size大小的图片链接
 */
export function getSizeImage(imgUrl: string | undefined, size?: number): string {
  return `${imgUrl}?param=${size}x${size}`
}

/**
 * @description 获取音乐播放链接
 * @param {number} id 歌曲id
 * @returns {string}
 */
export function getPlayUrl(id: number): string {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
/**
 * @description 格式化时间
 * @param {string | number | Date} time 初始化时间
 * @param {string} fmt
 * @returns {string}
 */
export function formatDate(time: string | number | Date, fmt: string): string {
  let date = new Date(time)

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o: any = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero(str: string | any[]) {
  return ('00' + str).substr(str.length)
}

export function formatMonthDay(time: string | number | Date) {
  return formatDate(time, 'MM月dd日')
}
export function formatMinuteSecond(time: number) {
  return formatDate(time, 'mm:ss')
}

/**
 *
 * @param {String} loginState 登录模式
 */
export function getParseLoginState(loginState: string) {
  let loginMode = ''
  switch (loginState) {
    case 'phone':
      loginMode = '手机号'
      break
    case 'email':
      loginMode = '邮箱'
      break
    default:
      loginMode = '手机号'
      break
  }
  return loginMode
}

/**
 * 根据不同登录方式,返回匹配对应的正则
 * @param {String} loginState 登录状态
 */
export function getMatchReg(loginState: string) {
  switch (loginState) {
    case 'phone':
      return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    case 'email':
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    default:
      return /^/
  }
}

/**
 * 格式化时间
 * @param str
 * @returns {string}
 * {y}-{m}-{d} {h}:{i}:{s}
 */
export function parseTime(time: string | number | Date | any, cFormat: string): string {
  if (!time || arguments.length === 0) return null
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time
  } else {
    if (`${time}`.length === 10) time = parseInt(time, 10) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  // eslint-disable-next-line camelcase
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = `0${value}`
    }
    return value || 0
  })
  // eslint-disable-next-line camelcase
  return time_str
}

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
  let result: RouteObject = {}
  for (let item of routes) {
    if (item.path === path) return item
    if (item.children) {
      const res = searchRoute(path, item.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}

/**
 * @description 使用递归处理路由，生成一维数组，做菜单权限判断
 * @param {Array} routerList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(routerList: Array<any>, newArr: string[] = []) {
  routerList.forEach(item => {
    typeof item === 'object' && item.path && newArr.push(item.path)
    item.children && item.children.length && handleRouter(item.children, newArr)
  })
  return newArr
}

export function getCity(id: string | number) {
  return address[id]
}

/**
 * 获取url参数
 * @param url 参数名
 */
export function getQueryObject(url?: string) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
