import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSongListDetail, getSongCategory, getSongCategoryList } from '@/api/songlist'
import { handleSongsCategory } from '@/utils/handledata'
//歌单详情
const getSongListDetailData = createAsyncThunk('songList/getSongListData', async (id: string) => {
  const data = await getSongListDetail({ id: id }).then(res => {
    return res
  })
  return data
})

//歌单分类
const getCategory = createAsyncThunk('songList/getCategory', async () => {
  const data = await getSongCategory().then(res => {
    const categoryData = handleSongsCategory(res)
    return categoryData
  })
  return data
})

const getPlayList = createAsyncThunk<
  any,
  any,
  {
    state: any
  }
>('songList/getPlayList', async (page, { getState }) => {
  const name = getState().songList.currentCategory
  const data = await getSongCategoryList(name, page * 35).then(res => {
    return res
  })
  return data
})
export { getSongListDetailData, getCategory, getPlayList }
