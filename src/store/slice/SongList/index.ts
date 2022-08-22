import { createSlice } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { getSongListDetailData } from './action'
import { RootState } from '@/store'
type InitialState = {
  songListDetailInfo: {
    playList: {
      coverImgUrl: string
      name: string
      createTime: number
      creator: {
        avatarUrl: string
        nickname: string
      }
      tags: Array<string>
      description: string
      playCount: number
      tracks: Array<any>
    }
    privileges: Array<any>
  }
}
const initialState: InitialState = {
  songListDetailInfo: {
    playList: {
      coverImgUrl: '',
      name: '',
      createTime: 0,
      creator: {
        avatarUrl: '',
        nickname: ''
      },
      tags: [],
      description: '',
      playCount: 0,
      tracks: []
    },
    privileges: []
  }
}

export const SongListSlice = createSlice({
  name: 'songList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // 进行请求阶段的一些操作
    builder.addCase(getSongListDetailData.fulfilled, (state, action) => {
      state.songListDetailInfo.playList = action.payload.playlist
      state.songListDetailInfo.privileges = action.payload.privileges
    })
  }
})
//提前取出保存的数据并导出
export const selectSongListDetailInfo = (state: RootState) => ({ data: state.songList.songListDetailInfo, shallowEqual })
export default SongListSlice.reducer
//统一导出异步action
export { getSongListDetailData }
