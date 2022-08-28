import React, { useEffect, memo } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { formatMinuteSecond } from '@/utils/format'
import RcmHeader from '@/components/RcmHeader'
import TopSongItem from '../SongItem'
import {
  selectCurrentTopListTitleInfo,
  selectCurrentTopList,
  selectCurrentTopListId,
  getTopListItem
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
      <div className="toplist-main">
        <div className="main-header">
          <div className="sprite_table header-item"></div>
          <div className="sprite_table header-item header-title">标题</div>
          <div className="sprite_table header-item header-time">时长</div>
          <div className="sprite_table header-item header-singer">歌手</div>
        </div>
        <div className="main-list">
          {currentTopList &&
            currentTopList.slice(0, 100).map((item, index) => {
              return (
                <TopSongItem
                  key={item.id}
                  currentRanking={index + 1}
                  className="song_item"
                  coverPic={item.al.picUrl && index < 3 ? item.al.picUrl : ''}
                  duration={formatMinuteSecond(item.dt)}
                  songName={item.name}
                  singer={item.ar[0].name}
                  songId={item.id}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}
export default memo(TopListMain)
