import { createAsyncThunk } from '@reduxjs/toolkit'
import { changeCurrentSong, changeCurrentIndex, changePlayList, changeCurrentLyricList } from '@/store/slice/Player'
import { getSongDetail, getLyricData } from '@/api/song'
import { parseLyric } from '@/utils/parseLyric'
import { getRandom } from '@/utils/math'
//请求歌曲详细信息
const getSong = createAsyncThunk<
  any,
  number,
  {
    dispatch: any
    state: any
  }
>('player/getSong', async (id: number, { getState, dispatch }) => {
  if (id) {
    const playList = getState().player.playList
    const songIndex = playList.findIndex((song: { id: number }) => song.id === id)
    let song = null
    if (songIndex !== -1) {
      // 找到数据
      const currentSong = playList[songIndex]
      dispatch(changeCurrentIndex(songIndex))
      dispatch(changeCurrentSong(currentSong))
      dispatch(getLyric(currentSong.id))
    } else {
      // 未找到数据
      await getSongDetail({ ids: id }).then(res => {
        song = res.songs && res.songs[0]
        if (!song) return
        const newPlayList = [...playList]
        newPlayList.push(song)
        dispatch(changePlayList(newPlayList))
        dispatch(changeCurrentIndex(newPlayList.length - 1))
        dispatch(changeCurrentSong(song))
      })
    }

    //请求歌词
    if (!song) return
    dispatch(getLyric(song.id))
  }
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
    console.log(res)
    const lyric = res.lrc.lyric
    const lyricList = parseLyric(lyric)
    return lyricList
  })
  return data
})

export { getSong, changePlaySong, getLyric }
