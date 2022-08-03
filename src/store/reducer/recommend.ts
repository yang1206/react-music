import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { RootState } from '@/store'
import { getBannerList, getPersonalizedList } from '@/api/recommend'
interface Banners {
  imageUrl: string
  typeTitle: string
}
interface perSonalizeder {
  picUrl: string
  name: string
  id: number
}
interface InitialState {
  topBanners: Array<Banners>
  perSonalized: Array<perSonalizeder>
}
const initialState: InitialState = {
  topBanners: [],
  perSonalized: []
}
//TODO把数据请求从redux拿出来，使用Hook写
//请求轮播图
const getBannerData = async () => {
  return getBannerList().then(res => {
    return res
  })
}
//获取热门歌单
const getPersonalizedData = async () => {
  return getPersonalizedList({ limit: 8 }).then(res => {
    return res
  })
}
//异步Action
export const getBanner = createAsyncThunk('getBanner', async () => {
  const data = await getBannerData()
  return data
})
export const getPersonalized = createAsyncThunk('getPersonalized', async () => {
  const data = await getPersonalizedData()
  return data
})
export const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // 进行请求阶段的一些操作
    // builder.addCase(getBanner.pending, () => {
    //   console.log('进行中')
    // })
    builder.addCase(getBanner.fulfilled, (state, action) => {
      console.log('action.payload: ', action.payload)
      state.topBanners = action.payload.banners
      console.log('成功')
    })
    builder.addCase(getPersonalized.fulfilled, (state, action) => {
      console.log('action.payload: ', action.payload)
      state.perSonalized = action.payload.result
      console.log('成功')
    })
    // builder.addCase(getBanner.rejected, () => {
    //   console.log('失败')
    // })
  }
})
export const selectRecommend = (state: RootState) => ({ Banners: state.recommend.topBanners, shallowEqual })
export const selectPersonalized = (state: RootState) => ({ perSonalized: state.recommend.perSonalized, shallowEqual })
export default recommendSlice.reducer
