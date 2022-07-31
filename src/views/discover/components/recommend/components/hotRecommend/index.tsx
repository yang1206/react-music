import React, { memo } from 'react'
import RcmHeader from '@/components/RcmHeader'
const HotRecommend: React.FC = () => {
  const keywordClick = () => {}
  const props = {
    title: '热门推荐',
    keywords: ['华语', '流行', '民谣', '摇滚'],
    keywordClick: keywordClick
  }
  return (
    <div>
      <RcmHeader {...props} />
    </div>
  )
}
export default memo(HotRecommend)
