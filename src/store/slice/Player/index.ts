import { createSlice } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { RootState } from '@/store'
import { getSong } from './action'
interface InitialState {
  currentSongData: Array<any>
}
const initialState: InitialState = {
  currentSongData: []
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // 进行请求阶段的一些操作
    builder.addCase(getSong.fulfilled, (state, action) => {
      state.currentSongData = action.payload.songs
    })
  }
})
//提前取出保存的数据并导出
export const selectSong = (state: RootState) => ({ data: state.player.currentSongData, shallowEqual })
export default playerSlice.reducer
//统一导出异步action
export { getSong }
