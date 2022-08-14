import { createSlice } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { getSong, changePlaySong, getLyric } from './action'
import { RootState } from '@/store'
import { Player } from '@/store/interface/player'
interface InitialState {
  currentSongData: Player.SongDetail
  currentSongIndex: number
  playList: Array<any>
  sequence: number
  lyricList: Array<Player.Lyric>
  currentLyricIndex: number
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
  currentSongIndex: 0,
  playList: [],
  sequence: 0, //播放顺序  0 顺序播放 1 随机播放 2 单曲循环
  lyricList: [],
  currentLyricIndex: 0
}

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
    },
    changeCurrentLyricIndex: (state: { currentLyricIndex: number }, { payload }: any) => {
      state.currentLyricIndex = payload
    },
    changeCurrentLyricList: (state, { payload }: any) => {
      state.lyricList = payload
    }
  },
  extraReducers: builder => {
    // 进行请求阶段的一些操作
    builder.addCase(getLyric.fulfilled, (state, action) => {
      state.lyricList = action.payload
    })
  }
})
//提前取出保存的数据并导出
export const selectSong = (state: RootState) => ({ data: state.player.currentSongData, shallowEqual })
export const selectCurrentIndex = (state: RootState) => ({ data: state.player.currentSongIndex, shallowEqual })
export const selectSequence = (state: RootState) => ({ data: state.player.sequence, shallowEqual })
export const selectLyric = (state: RootState) => ({ data: state.player.lyricList, shallowEqual })
export const selectCurrentLyricIndex = (state: RootState) => ({ data: state.player.currentLyricIndex, shallowEqual })
export const selectPlayList = (state: RootState) => ({ data: state.player.playList, shallowEqual })
export default playerSlice.reducer
export const {
  changeCurrentSong,
  changeCurrentIndex,
  changePlayList,
  changeSequence,
  changeCurrentLyricIndex,
  changeCurrentLyricList
} = playerSlice.actions
//统一导出异步action
export { getSong, changePlaySong, getLyric }
