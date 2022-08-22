import { createSlice } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { getSearchSong, getSearchSongList, getSearchSingerList, getSearchAlbumList } from './action'
import { RootState } from '@/store'
interface InitialState {
  searchSongList: Array<any>
  focusState: boolean
  singleSongList: Array<any>
  singerList: Array<any>
  albumList: Array<any>
}
const initialState: InitialState = {
  searchSongList: [],
  focusState: false,
  singleSongList: [],
  singerList: [],
  albumList: []
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeFocusState: (state, { payload }: any) => {
      state.focusState = payload
    }
  },
  extraReducers: builder => {
    // 进行请求阶段的一些操作
    builder.addCase(getSearchSong.fulfilled, (state, action) => {
      state.searchSongList = action.payload.result.songs
    })
    builder.addCase(getSearchSongList.fulfilled, (state, action) => {
      state.singleSongList = action.payload.result.songs
    })
    builder.addCase(getSearchSingerList.fulfilled, (state, action) => {
      state.singerList = action.payload.result.artists
    })
    builder.addCase(getSearchAlbumList.fulfilled, (state, action) => {
      state.albumList = action.payload.result.albums
    })
  }
})
//提前取出保存的数据并导出
export const selectFocusState = (state: RootState) => ({ data: state.search.focusState, shallowEqual })
export const selectSearchSongList = (state: RootState) => ({ data: state.search.searchSongList, shallowEqual })
export const selectSingleSongList = (state: RootState) => ({ data: state.search.singleSongList, shallowEqual })
export const selectSingerList = (state: RootState) => ({ data: state.search.singerList, shallowEqual })
export const selectAlbumList = (state: RootState) => ({ data: state.search.albumList, shallowEqual })
export default searchSlice.reducer
export const { changeFocusState } = searchSlice.actions
//统一导出异步action
export { getSearchSong, getSearchSongList, getSearchSingerList, getSearchAlbumList }
