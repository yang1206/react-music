import { createSlice } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { getSongListDetailData, getCategory, getPlayList } from './action'
import { RootState } from '@/store'
type InitialState = {
  songListDetailInfo: {
    playList: {
      id: number
      coverImgUrl: string
      name: string
      createTime: number
      userId: number
      [props: string]: any
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
  category: any[]
  currentCategory: string
  categorySongs: {
    [key: string]: any
  }
}
const initialState: InitialState = {
  songListDetailInfo: {
    playList: {
      coverImgUrl: '',
      id: null,
      name: '',
      userId: null,
      createTime: 0,
      creator: {
        avatarUrl: '',
        nickname: ''
      },
      subscribed: null,
      tags: [],
      description: '',
      playCount: 0,
      tracks: []
    },
    privileges: []
  },
  category: [],
  currentCategory: '全部',
  categorySongs: {}
}

export const SongListSlice = createSlice({
  name: 'songList',
  initialState,
  reducers: {
    changeCurrentCategory: (state, { payload }: any) => {
      state.currentCategory = payload
    }
  },
  extraReducers: builder => {
    // 进行请求阶段的一些操作
    builder.addCase(getSongListDetailData.fulfilled, (state, action) => {
      state.songListDetailInfo.playList = action.payload.playlist
      state.songListDetailInfo.privileges = action.payload.privileges
    })
    builder.addCase(getPlayList.fulfilled, (state, action) => {
      state.categorySongs = action.payload
    })
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.category = action.payload
    })
  }
})
//提前取出保存的数据并导出
export const selectSongListDetailInfo = (state: RootState) => ({ data: state.songList.songListDetailInfo, shallowEqual })
export const selectCategory = (state: RootState) => ({ data: state.songList.category, shallowEqual })
export const selectCurrentCategory = (state: RootState) => ({ data: state.songList.currentCategory, shallowEqual })
export const selectCategorySongs = (state: RootState) => ({ data: state.songList.categorySongs, shallowEqual })
export default SongListSlice.reducer
export const { changeCurrentCategory } = SongListSlice.actions
//统一导出异步action
export { getSongListDetailData, getCategory, getPlayList }
