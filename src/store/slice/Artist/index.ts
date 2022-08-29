import { createSlice } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { getTopListInfo, getTopListTitleInfo, getTopListItem } from './action'
import { RootState } from '@/store'
type InitialState = {
  topListInfo: any[]
  currentIndex: number
  currentTopListId: number
  currentTopListTitleInfo: {
    [key: string]: any
  }
  currentTopList: any[]
}
const initialState: InitialState = {
  topListInfo: [],
  currentIndex: 0,
  currentTopListId: 19723756,
  currentTopListTitleInfo: {},
  currentTopList: []
}

export const TopListSlice = createSlice({
  name: 'topList',
  initialState,
  reducers: {
    // 改变当前索引
    changeCurrentIndex: (state, { payload }: any) => {
      state.currentIndex = payload
    },
    // 改变当前歌单的ID
    changeCurrentTopListId: (state, { payload }: any) => {
      state.currentTopListId = payload
    }
  },
  extraReducers: builder => {
    // 进行请求阶段的一些操作
    builder.addCase(getTopListInfo.fulfilled, (state, action) => {
      state.topListInfo = action.payload
    })
    builder.addCase(getTopListTitleInfo.fulfilled, (state, action) => {
      state.currentTopListTitleInfo = action.payload
    })
    builder.addCase(getTopListItem.fulfilled, (state, action) => {
      state.currentTopList = action.payload
    })
  }
})
//提前取出保存的数据并导出
export const selectTopListInfo = (state: RootState) => ({ data: state.topList.topListInfo, shallowEqual })
export const selectCurrentIndex = (state: RootState) => ({ data: state.topList.currentIndex, shallowEqual })
export const selectCurrentTopListId = (state: RootState) => ({ data: state.topList.currentTopListId, shallowEqual })
export const selectCurrentTopListTitleInfo = (state: RootState) => ({ data: state.topList.currentTopListTitleInfo, shallowEqual })
export const selectCurrentTopList = (state: RootState) => ({ data: state.topList.currentTopList, shallowEqual })
export default TopListSlice.reducer
export const { changeCurrentIndex, changeCurrentTopListId } = TopListSlice.actions
//统一导出异步action
export { getTopListInfo, getTopListTitleInfo, getTopListItem }
