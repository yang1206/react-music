import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail } from '@/api/song'
export const getSong = createAsyncThunk('getSong', async (id: number) => {
  const data = await getSongDetail({ ids: id }).then(res => {
    return res
  })
  return data
})
