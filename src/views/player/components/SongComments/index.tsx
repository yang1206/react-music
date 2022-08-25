import React, { useEffect, memo } from 'react'
import { selectHotComments } from '@/store/slice/Player'
import { useAppSelector } from '@/hooks/useStore'
//TODO歌曲评论
import './index.less'
const SongComments: React.FC = () => {
  const hotComments = useAppSelector(selectHotComments).data
  useEffect(() => {
    console.log(hotComments)
  }, [])
  return <div></div>
}
export default memo(SongComments)
