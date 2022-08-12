import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { getSongDetail } from '@/api/song'
import { RootState } from '@/store'
import { Player } from '@/store/interface/player'
interface InitialState {
  currentSongData: Player.SongDetail
  currentSongIndex: Array<any>
  playList: Array<any>
  sequence: number
}
const initialState: InitialState = {
  currentSongData: {
    name: '',
    id: null,
    publishTime: null,
    ar: [],
    al: { picUrl: '', id: 0, name: '', pic_str: '', pic: 0 },
    dt: 0
  },
  currentSongIndex: [],
  playList: [],
  sequence: 0 //播放顺序  0 顺序播放 1 随机播放 2 单曲循环
}

const getSong = createAsyncThunk<
  any,
  number,
  {
    dispatch: any
    state: any
  }
>('getSong', async (id: number, { getState, dispatch }) => {
  if (id) {
    const playList = getState().player.playList
    const songIndex = playList.findIndex((song: { id: number }) => song.id === id)
    if (songIndex !== -1) {
      // 找到数据
      const currentSong = playList[songIndex]
      dispatch(changeCurrentIndex(songIndex))
      dispatch(changeCurrentSong(currentSong))
    } else {
      // 未找到数据
      await getSongDetail({ ids: id }).then(res => {
        const song = res.songs && res.songs[0]
        if (!song) return
        const newPlayList = [...playList]
        newPlayList.push(song)
        dispatch(changePlayList(newPlayList))
        dispatch(changeCurrentIndex(newPlayList.length - 1))
        dispatch(changeCurrentSong(song))
      })
    }
  }
})

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSong: (state: { currentSongData: any }, { payload }: any) => {
      state.currentSongData = payload
    },
    changeCurrentIndex: (state: { currentSongIndex: any }, { payload }: any) => {
      state.currentSongIndex = payload
    },
    changePlayList: (state: { playList: any }, { payload }: any) => {
      state.playList = payload
    },
    changeSequence: (state: { sequence: number }, { payload }: any) => {
      state.sequence = payload
    }
  }
})
//提前取出保存的数据并导出
export const selectSong = (state: RootState) => ({ data: state.player.currentSongData, shallowEqual })
export const selectSequence = (state: RootState) => ({ data: state.player.sequence, shallowEqual })
export default playerSlice.reducer
export const { changeCurrentSong, changeCurrentIndex, changePlayList, changeSequence } = playerSlice.actions
//统一导出异步action
export { getSong }
