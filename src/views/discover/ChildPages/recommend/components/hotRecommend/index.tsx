import React, { useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectPersonalized, getPersonalized } from '@/store/slice/recommend'
import { Recommend } from '@/store/interface/recommend'
import RcmHeader from '@/components/RcmHeader'
import SongsCover from '@/components/SongsCover'
// import { useNavigate } from 'react-router-dom'
import './index.less'
const HotRecommend: React.FC = () => {
  const navigate = useNavigate()
  const props = {
    title: '热门推荐',
    keywords: ['华语', '流行', '民谣', '摇滚', '电子'],
    moreLink: '/discover/playlist',
    keywordClick: (item?: string) => {
      navigate(`/discover/playlist?cat=${item}`, {
        replace: false
      })
    }
  }
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getPersonalized())
  }, [])
  const PersonalizedData = useAppSelector(selectPersonalized)
  if (!PersonalizedData) return null
  return (
    <div className="HotRecommendWrapper">
      <RcmHeader {...props} />
      <div className="recommend-list">
        {PersonalizedData?.data.map((item: Recommend.perSonalizeder) => {
          return <SongsCover key={item.id} info={item} />
        })}
      </div>
    </div>
  )
}
export default memo(HotRecommend)
