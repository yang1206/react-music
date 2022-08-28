import React, { useState, memo } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectCategorySongs, getPlayList } from '@/store/slice/SongList'
import { Skeleton } from 'antd'
import SongsCover from '@/components/SongsCover'
import Pagination from '@/components/Pagination'
import { Recommend } from '@/store/interface/recommend'
import './index.less'
const SongsList: React.FC = () => {
  const dispatch = useAppDispatch()
  const categorySongs = useAppSelector(selectCategorySongs).data
  const songsList = categorySongs.playlists || []
  const total = categorySongs.total || 0
  // hooks
  const [currentPage, setCurrentPage] = useState(1)
  function onPageChange(page: React.SetStateAction<number>) {
    window.scroll(0, 0)
    setCurrentPage(page)
    dispatch(getPlayList(page))
  }
  return (
    <div className="SongsListWrapper">
      {!songsList.length ? (
        <Skeleton active />
      ) : (
        <div className="songs-list">
          {songsList.map((item: Recommend.perSonalizeder, index: number) => {
            return <SongsCover key={index} info={item} />
          })}
        </div>
      )}
      <Pagination currentPage={currentPage} total={total} pageSize={35} onPageChange={onPageChange} />
    </div>
  )
}
export default memo(SongsList)
