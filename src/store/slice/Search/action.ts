import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSearch } from '@/api/search'

//请求歌词信息
const getSearchSongList = createAsyncThunk('search/getSearchSongList', async (keywords: string) => {
  const data = await getSearch({ keywords: keywords, limit: 6, type: 1 }).then(res => {
    return res
  })
  return data
})

export { getSearchSongList }
