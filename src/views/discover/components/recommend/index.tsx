import React, { memo } from 'react'
import Banner from './components/banner'
import HotRecommend from './components/hotRecommend'
import NewAlbum from './components/newAlbum'
import Ranking from './components/ranking'
const Recommend: React.FC = () => {
  return (
    <div className="RecommendWarper">
      <Banner />
      <div className="Content wrap-v2">
        <div className="RecommendLeft">
          <HotRecommend />
          <NewAlbum />
          <Ranking />
        </div>
        <div className="RecommendRight"></div>
      </div>
    </div>
  )
}
export default memo(Recommend)
