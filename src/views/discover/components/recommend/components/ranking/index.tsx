import React, { useEffect, memo } from 'react'
import RcmHeader from '@/components/RcmHeader'
import TopRanking from '@/components/TopRanking'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectTopList, getTopLists } from '@/store/slice/recommend'
import './index.less'
const NewAlbum: React.FC = () => {
  const props = {
    title: '榜单',
    keywords: [],
    keywordClick: () => {
      //
    },
    moreLink: '/discover/ranking'
  }
  const { newList, riseList, originalList } = useAppSelector(selectTopList).data
  const dispatch = useAppDispatch()
  useEffect(() => {
    //飙升榜
    dispatch(getTopLists(19723756))
    //新歌榜
    dispatch(getTopLists(3779629))
    //原创榜
    dispatch(getTopLists(2884035))
    //热歌榜
    //dispatch(getTopLists(3778678))
  }, [])
  return (
    <div className="RankingWrapper">
      <RcmHeader {...props} />
      <div className="tops">
        <TopRanking info={riseList} />
        <TopRanking info={newList} />
        <TopRanking info={originalList} />
      </div>
    </div>
  )
}
export default memo(NewAlbum)
