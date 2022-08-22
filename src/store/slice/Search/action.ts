import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSearch } from '@/api/search'
import { tryHideFullScreenLoading } from '@/config/serviceLoading'
type SearchParams = {
  keywords: string
  type: string
}
//header搜索列表
const getSearchSong = createAsyncThunk('search/getSearchSong', async (keywords: string) => {
  tryHideFullScreenLoading()
  const data = await getSearch({ keywords: keywords, limit: 6, type: '1' }).then(res => {
    return res
  })
  return data
})

//搜索歌曲
const getSearchSongList = createAsyncThunk('search/getSearchSongList', async (params: SearchParams) => {
  const data = await getSearch({ limit: 20, ...params }).then(res => {
    return res
  })
  return data
})
//搜索歌手
const getSearchSingerList = createAsyncThunk('search/getSearchSingerList', async (keywords: string) => {
  const data = await getSearch({ keywords: keywords, limit: 20, type: '100' }).then(res => {
    return res
  })
  return data
})

//搜索专辑
const getSearchAlbumList = createAsyncThunk('search/getSearchAlbumList', async (keywords: string) => {
  const data = await getSearch({ keywords: keywords, limit: 20, type: '10' }).then(res => {
    return res
  })
  return data
})
export { getSearchSong, getSearchSongList, getSearchSingerList, getSearchAlbumList }
