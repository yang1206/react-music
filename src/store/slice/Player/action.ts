import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  changeCurrentSong,
  changeCurrentIndex,
  changePlayList,
  changeCurrentLyricList,
  changePlayListCount,
  changeFirstLoad
} from '@/store/slice/Player'
import { getSongDetail, getLyricData, checkMusic, getHotCommentData } from '@/api/song'
import { parseLyric } from '@/utils/parseLyric'
import { getRandom } from '@/utils/math'
import { addPlaylistId } from '@/utils/storage'
import { message } from 'antd'
//请求歌曲详细信息
interface getSong {
  id: number
  isPlay?: boolean
}
const getSong = createAsyncThunk<
  any,
  getSong,
  {
    dispatch: any
    state: any
  }
>('player/getSong', async (params: getSong, { getState, dispatch }) => {
  //检查歌曲是否可用
  let checkSong = await checkMusic({ id: params.id }).then(res => {
    return res.success
  })
  if (checkSong && params.id) {
    //已经点击播放歌曲，改变第一次播放状态
    dispatch(changeFirstLoad(false))
    const playList = getState().player.playList
    const isLogin = getState().login.isLogin
    const vipType = getState().login.profile?.vipType
    const songIndex = playList.findIndex((song: { id: number }) => song.id === params.id)
    let song = null
    if (songIndex !== -1) {
      // 找到数据
      const currentSong = playList[songIndex]
      dispatch(changeCurrentIndex(songIndex))
      dispatch(changeCurrentSong(currentSong))
      dispatch(getLyric(currentSong.id))
    } else {
      // 未找到数据
      await getSongDetail({ ids: params.id }).then(res => {
        //判断歌曲是否需要付费
        if (res.privileges[0].fee !== 0 && res.privileges[0].fee !== 8) {
          //如果已经登录且不是vip或未登录，直接提示
          if ((isLogin && vipType === 0) || !isLogin) {
            message.info('该歌曲需要付费或vip')
            //如果已经登录且是vip就播放
          } else if (isLogin && vipType == 1) {
            song = res.songs && res.songs[0]
            addPlaylistId(params.id)
            if (!song) return
            const newPlayList = [...playList]
            newPlayList.push(song)
            dispatch(changePlayList(newPlayList))
            dispatch(changeCurrentIndex(newPlayList.length - 1))
            dispatch(changePlayListCount(newPlayList.length))
            //定义一个参数判断是点击了播放还是点击了加入播放列表
            params.isPlay && dispatch(changeCurrentSong(song))
            //请求歌词
            if (!song) return
            params.isPlay && dispatch(getLyric(song.id))
          }
        } else {
          song = res.songs && res.songs[0]
          addPlaylistId(params.id)
          if (!song) return
          const newPlayList = [...playList]
          newPlayList.push(song)
          dispatch(changePlayList(newPlayList))
          dispatch(changeCurrentIndex(newPlayList.length - 1))
          dispatch(changePlayListCount(newPlayList.length))
          //定义一个参数判断是点击了播放还是点击了加入播放列表
          params.isPlay && dispatch(changeCurrentSong(song))
          //请求歌词
          if (!song) return
          params.isPlay && dispatch(getLyric(song.id))
        }
      })
    }
  } else {
    message.error('暂无版权')
  }
})

interface getSongDetailArray {
  listId: Array<any>
  index: number
}

const getSongDetailArray = createAsyncThunk<
  any,
  getSongDetailArray,
  {
    dispatch: any
    state: any
  }
>('player/getSongDetailArray', async (params: getSongDetailArray, { getState, dispatch }) => {
  const playList = getState().player.playList
  let newArr = [...playList]
  const { listId, index } = params
  let i = 0
  let timer = null
  let executedRun = true
  timer = setInterval(() => {
    let idx = listId[i]
    new Promise(resolve => {
      executedRun &&
        getSongDetail({ ids: idx }).then(res => {
          executedRun = false
          // (0)歌曲ID添加到本地存储
          addPlaylistId(idx)
          const song = res.songs && res.songs[0]
          if (!song) return
          // (1)添加到播放列表中
          newArr = [...newArr, song]
          dispatch(changePlayList(newArr))
          // (2)更改当前播放的索引
          const songIndex = index ?? newArr.length - 1
          dispatch(changeCurrentIndex(songIndex))
          // (3)更改当前播放歌曲
          let currentIndexSong = newArr[songIndex] || song
          dispatch(changeCurrentSong(currentIndexSong))
          // (4)请求歌曲的歌词
          if (currentIndexSong.id === idx) dispatch(getLyric(idx))
          // (5)更新歌曲数量
          dispatch(changePlayListCount(newArr.length))
          resolve(i)
        })
    }).then(() => {
      executedRun = true
    })
    i++
    if (i >= listId.length) {
      clearInterval(timer)
    }
  })
})

//改变当前播放歌曲
//因为要拿到dispatch，所有使用异步action
const changePlaySong = createAsyncThunk<
  any,
  number,
  {
    dispatch: any
    state: any
  }
>('player/changePlaySong', async (tag: number, { getState, dispatch }) => {
  const sequence = getState().player.sequence
  const playList = getState().player.playList
  let currentSongIndex = getState().player.currentSongIndex
  let randomIndex = getRandom(playList.length)
  if (playList.length == 0) return
  switch (sequence) {
    case 1:
      if (randomIndex === currentSongIndex) {
        randomIndex = getRandom(playList.length)
      }
      currentSongIndex = randomIndex
      break
    case 2:
      //循环播放直接return
      return currentSongIndex
    default:
      currentSongIndex += tag
      if (currentSongIndex === playList.length) currentSongIndex = 0
      if (currentSongIndex === -1) currentSongIndex = playList.length - 1
      break
  }
  const currentSong = playList[currentSongIndex]
  dispatch(changeCurrentSong(currentSong))
  dispatch(changeCurrentIndex(currentSongIndex))
  dispatch(changeCurrentLyricList([]))
  dispatch(getLyric(currentSong.id))
})

//请求歌词信息
const getLyric = createAsyncThunk('player/getLyric', async (id: number) => {
  const data = await getLyricData({ id: id }).then(res => {
    const lyric = res.lrc.lyric
    const lyricList = parseLyric(lyric)
    return lyricList
  })
  return data
})

//获取歌曲热评
const getHotComment = createAsyncThunk('player/getHotComment', async (id: number) => {
  const data = await getHotCommentData({ id: id, type: 0 }).then(res => {
    return res.hotComments
  })
  return data
})

export { getSong, changePlaySong, getLyric, getSongDetailArray, getHotComment }
