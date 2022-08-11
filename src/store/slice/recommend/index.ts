import { createSlice } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { RootState } from '@/store'
import { Recommend } from '@/store/interface/recommend'
import { getBanner, getPersonalized, getNewAlbums, getTopLists } from './action'
interface InitialState {
  BannersData: Array<Recommend.Banners>
  PersonalizedData: Array<Recommend.perSonalizeder>
  newAlbumData: Array<Recommend.NewAlbums>
  RankingData: Recommend.TopList
}
const initialState: InitialState = {
  BannersData: [],
  PersonalizedData: [],
  newAlbumData: [],
  RankingData: {
    newList: {},
    riseList: {},
    originalList: {}
  }
}

export const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // 进行请求阶段的一些操作
    builder.addCase(getBanner.fulfilled, (state, action) => {
      state.BannersData = action.payload.banners
    })
    builder.addCase(getPersonalized.fulfilled, (state, action) => {
      state.PersonalizedData = action.payload.result
    })
    builder.addCase(getNewAlbums.fulfilled, (state, action) => {
      state.newAlbumData = action.payload.albums
    })
    builder.addCase(getTopLists.fulfilled, (state, action) => {
      //根据id存入对应的榜单数据
      switch (action.meta.arg) {
        case 3779629:
          state.RankingData.newList = action.payload.playlist
          break
        case 19723756:
          state.RankingData.riseList = action.payload.playlist
          break
        case 2884035:
          state.RankingData.originalList = action.payload.playlist
          break
      }
    })
  }
})
//提前取出保存的数据并导出
export const selectBanners = (state: RootState) => ({ data: state.recommend.BannersData, shallowEqual })
export const selectPersonalized = (state: RootState) => ({ data: state.recommend.PersonalizedData, shallowEqual })
export const selectNewAlbums = (state: RootState) => ({ data: state.recommend.newAlbumData, shallowEqual })
export const selectTopList = (state: RootState) => ({ data: state.recommend.RankingData, shallowEqual })
export default recommendSlice.reducer
//统一导出异步action
export { getBanner, getPersonalized, getNewAlbums, getTopLists }
