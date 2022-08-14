import { createAsyncThunk } from '@reduxjs/toolkit'
import { getBannerList, getPersonalizedList, getNewestAlbums, getPlaylist } from '@/api/recommend'
//异步Action
export const getBanner = createAsyncThunk('recommend/getBanner', async () => {
  const data = await getBannerList().then(res => {
    return res
  })
  return data
})
export const getPersonalized = createAsyncThunk('recommend/getPersonalized', async () => {
  const data = await getPersonalizedList({ limit: 10 }).then(res => {
    return res
  })
  return data
})
export const getNewAlbums = createAsyncThunk('recommend/getNewAlbums', async () => {
  const data = await getNewestAlbums({ limit: 10 }).then(res => {
    return res
  })
  return data
})
export const getTopLists = createAsyncThunk('getTopLists', async (id: number) => {
  const data = await getPlaylist({ id: id }).then(res => {
    return res
  })
  return data
})
