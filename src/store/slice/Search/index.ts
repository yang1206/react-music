import { createSlice } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { getSearchSongList } from './action'
import { RootState } from '@/store'
interface InitialState {
  searchSongList: Array<any>
  focusState: boolean
}
const initialState: InitialState = {
  searchSongList: [],
  focusState: false
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
    builder.addCase(getSearchSongList.fulfilled, (state, action) => {
      state.searchSongList = action.payload.result.songs
    })
  }
})
//提前取出保存的数据并导出
export const selectFocusState = (state: RootState) => ({ data: state.search.focusState, shallowEqual })
export const selectSearchSongList = (state: RootState) => ({ data: state.search.searchSongList, shallowEqual })
export default searchSlice.reducer
export const { changeFocusState } = searchSlice.actions
//统一导出异步action
export { getSearchSongList }
