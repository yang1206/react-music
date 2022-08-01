import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { RootState } from '@/store'
import { getBannerList } from '@/api'
interface Ibanners {
  imageUrl: string
  typeTitle: string
}
interface InitialState {
  topBanners: Array<Ibanners>
}
const initialState: InitialState = {
  topBanners: []
}
//请求轮播图
const getBannerData = async () => {
  return getBannerList().then(res => {
    return res
  })
}
//异步Action
export const getBanner = createAsyncThunk('getBanner', async () => {
  const data = await getBannerData()
  return data
})

export const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // 进行请求阶段的一些操作
    builder.addCase(getBanner.pending, () => {
      console.log('进行中')
    })
    builder.addCase(getBanner.fulfilled, (state, action) => {
      console.log('action.payload: ', action.payload)
      state.topBanners = action.payload.banners
      console.log('成功')
    })
    builder.addCase(getBanner.rejected, () => {
      console.log('失败')
    })
  }
})
export const selectRecommend = (state: RootState) => ({ Banners: state.recommend.topBanners, shallowEqual })
export default recommendSlice.reducer
