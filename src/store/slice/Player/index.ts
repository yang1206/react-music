import { createSlice } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { getSong, changePlaySong, getSongDetailArray, getLyric, getHotComment } from './action'
import { RootState } from '@/store'
import { Player } from '@/store/interface/player'
import { setCurrentSongIndex } from '@/utils/storage'
interface InitialState {
  currentSongData: Player.SongDetail
  currentSongIndex: number
  playList: Array<any>
  sequence: number
  lyricList: Array<Player.Lyric>
  currentLyricIndex: number
  playListCount: number
  showLyrics: boolean
  firstLoad: boolean
  hotComments: Array<any>
  currentCommentTotal: number
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
  currentLyricIndex: 0,
  firstLoad: true,
  playListCount: 5,
  showLyrics: true,
  hotComments: [],
  currentCommentTotal: 0
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSong: (state, { payload }: any) => {
      state.currentSongData = payload
    },
    changeCurrentIndex: (state, { payload }: any) => {
      setCurrentSongIndex(payload)
      state.currentSongIndex = payload
    },
    changePlayList: (state, { payload }: any) => {
      state.playList = payload
    },
    changeSequence: (state, { payload }: any) => {
      state.sequence = payload
    },
    changeCurrentLyricIndex: (state, { payload }: any) => {
      state.currentLyricIndex = payload
    },
    changeCurrentLyricList: (state, { payload }: any) => {
      state.lyricList = payload
    },
    changePlayListCount: (state, { payload }: any) => {
      state.playListCount = payload
    },
    changeShowLyrics: (state, { payload }) => {
      state.showLyrics = payload
    },
    changeCurrentTotal: (state, { payload }) => {
      state.currentCommentTotal = payload
    },
    changeFirstLoad: (state, { payload }) => {
      state.firstLoad = payload
    }
  },
  extraReducers: builder => {
    // 进行请求阶段的一些操作
    builder.addCase(getLyric.fulfilled, (state, action) => {
      state.lyricList = action.payload
    })
    builder.addCase(getHotComment.fulfilled, (state, action) => {
      state.hotComments = action.payload
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
export const selectIsShowLyrics = (state: RootState) => ({ data: state.player.showLyrics, shallowEqual })
export const selectFirstLoad = (state: RootState) => ({ data: state.player.firstLoad, shallowEqual })
export const selectHotComments = (state: RootState) => ({ data: state.player.hotComments, shallowEqual })
export const selectCurrentTotal = (state: RootState) => ({ data: state.player.currentCommentTotal, shallowEqual })
export default playerSlice.reducer
export const {
  changeCurrentSong,
  changeCurrentIndex,
  changePlayList,
  changeSequence,
  changeCurrentLyricIndex,
  changeCurrentLyricList,
  changePlayListCount,
  changeShowLyrics,
  changeCurrentTotal,
  changeFirstLoad
} = playerSlice.actions
//统一导出异步action
export { getSong, changePlaySong, getSongDetailArray, getLyric, getHotComment }
