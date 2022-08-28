import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllTopList, getPlaylist } from '@/api/recommend'
//榜单列表
const getTopListInfo = createAsyncThunk('topList/getTopListInfoAction', async (id: number) => {
  const data = await getAllTopList(id).then(res => {
    return res.list
  })
  return data
})

const getTopListTitleInfo = createAsyncThunk('topList/getTopListTitleInfo', async (id: number | string) => {
  const data = await getPlaylist({ id: Number(id) }).then(res => {
    // 取出榜单标题详情信息
    const { coverImgUrl, name, trackNumberUpdateTime, playCount, subscribedCount, commentCount, shareCount } = res && res.playlist
    const topListTitleInfo = {
      coverImgUrl,
      name,
      trackNumberUpdateTime,
      playCount,
      subscribedCount,
      commentCount,
      shareCount
    }
    return topListTitleInfo
  })
  return data
})

const getTopListItem = createAsyncThunk('topList/getTopListItem', async (id: number) => {
  const data = await getPlaylist({ id: id }).then(res => {
    return res.playlist.tracks
  })
  return data
})
export { getTopListInfo, getTopListTitleInfo, getTopListItem }
