import React, { useEffect, useState, memo } from 'react'
import RcmHeader from '@/components/RcmHeader'
import SongsCover from '@/components/SongsCover'
import { getPersonalizedList } from '@/api/recommend'
import { Recommend } from '@/api/interface'
// import { useNavigate } from 'react-router-dom'
import './index.less'
const HotRecommend: React.FC = () => {
  // const navigate = useNavigate()
  const props = {
    title: '热门推荐',
    keywords: ['华语', '流行', '民谣', '摇滚', '电子'],
    moreLink: '/discover/songs',
    keywordClick: () => {
      // navigate('/discover/songs')
    }
  }
  const [PersonalizedData, setPersonalized] = useState([] as any)
  console.log(PersonalizedData)
  //获取热门歌单
  const getPersonalizedData = async () => {
    return getPersonalizedList({ limit: 12 }).then(res => {
      //放到state里
      setPersonalized(res.result)
    })
  }
  useEffect(() => {
    getPersonalizedData()
  }, [])
  return (
    <div className="HotRecommendWrapper">
      <RcmHeader {...props} />
      <div className="recommend-list">
        {PersonalizedData.map((item: Recommend.perSonalizeder) => {
          return <SongsCover key={item.id} info={item} />
        })}
      </div>
    </div>
  )
}
export default memo(HotRecommend)
