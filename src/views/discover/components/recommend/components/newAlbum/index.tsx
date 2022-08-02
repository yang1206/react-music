import React, { memo } from 'react'
import RcmHeader from '@/components/RcmHeader'
const NewAlbum: React.FC = () => {
  const keywordClick = () => {}
  const props = {
    title: '新碟上架',
    keywords: [],
    keywordClick: keywordClick
  }
  return (
    <div>
      <RcmHeader {...props} />
    </div>
  )
}
export default memo(NewAlbum)
