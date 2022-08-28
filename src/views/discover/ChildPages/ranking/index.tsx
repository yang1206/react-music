import React, { useEffect, memo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectTopListInfo, selectCurrentTopListId, getTopListInfo, getTopListTitleInfo } from '@/store/slice/TopList'
import TopListTitle from './components/Title'
import TopListMain from './components/Main'
import TopListInfo from './components/TopList'
import './index.less'
const Ranking: React.FC = () => {
  const [params] = useSearchParams()
  const dispatch = useAppDispatch()
  const topListInfo = useAppSelector(selectTopListInfo).data
  const currentTopListId = useAppSelector(selectCurrentTopListId).data
  useEffect(() => {
    // 榜单item
    dispatch(getTopListInfo(null))
  }, [dispatch])
  // 排行榜头部信息
  useEffect(() => {
    // 派发榜单标题信息Action
    let id: string | number = params.get('id')
    id = id ? id : currentTopListId
    dispatch(getTopListTitleInfo(id))
  }, [currentTopListId, dispatch])
  return (
    <div className="TopListWrapper wrap-bg2">
      <div className="top-list-content wrap-v2">
        <div className="TopListLeft">
          <div className="top-list-container">
            <TopListInfo topListInfo={topListInfo} />
          </div>
        </div>
        <div className="TopListRight">
          <TopListTitle />
          <TopListMain />
        </div>
      </div>
    </div>
  )
}
export default memo(Ranking)
