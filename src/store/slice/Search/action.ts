import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSearch } from '@/api/search'
type SearchParams = {
  keywords: string
  type: number
}
//header搜索列表
const getSearchSong = createAsyncThunk('search/getSearchSong', async (keywords: string) => {
  const data = await getSearch({ keywords: keywords, limit: 6, type: 1 }).then(res => {
    return res
  })
  return data
})

//搜索页搜索
const getSearchSongList = createAsyncThunk('search/getSearchSongList', async (params: SearchParams) => {
  const data = await getSearch({ limit: 20, ...params }).then(res => {
    return res
  })
  return data
})

export { getSearchSong, getSearchSongList }
