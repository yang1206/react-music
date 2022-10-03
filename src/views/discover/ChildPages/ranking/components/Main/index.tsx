import React, { memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import RcmHeader from '@/components/RcmHeader'
import PlayList from '@/components/PlayList'
import {
  getTopListItem,
  selectCurrentTopList,
  selectCurrentTopListId,
  selectCurrentTopListTitleInfo,
} from '@/store/slice/TopList'
import './index.less'
const TopListMain: React.FC = () => {
  const playCount = useAppSelector(selectCurrentTopListTitleInfo).data.playCount
  const currentTopListId = useAppSelector(selectCurrentTopListId).data
  const currentTopList = useAppSelector(selectCurrentTopList).data

  const dispatch = useAppDispatch()
  // other hook
  useEffect(() => {
    dispatch(getTopListItem(currentTopListId))
  }, [dispatch, currentTopListId])
  // other handle
  const rightSlot = (
    <span>
      播放：<em style={{ color: '#c20c0c' }}>{playCount}</em>次
    </span>
  )
  return (
    <div className="TopListMainWrapper">
      <RcmHeader title="歌曲列表" right={rightSlot} />
      <PlayList playlist={currentTopList} hideAl={true} />
    </div>
  )
}
export default memo(TopListMain)
