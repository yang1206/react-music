import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSongListDetail } from '@/api/songlist'
//歌单详情
const getSongListDetailData = createAsyncThunk('songList/getSongListData', async (id: string) => {
  const data = await getSongListDetail({ id: id }).then(res => {
    return res
  })
  return data
})

export { getSongListDetailData }
