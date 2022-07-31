import React, { memo } from 'react'
import Banner from './components/banner'
import HotRecommend from './components/hotRecommend'
const Recommend: React.FC = () => {
  return (
    <div className="RecommendWraper">
      <Banner />
      <div className="Content wrap-v2">
        <div className="RecommendLeft">
          <HotRecommend />
        </div>
        <div className="RecommendRight"></div>
      </div>
    </div>
  )
}
export default memo(Recommend)
