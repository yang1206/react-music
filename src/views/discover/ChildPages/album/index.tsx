import React, { memo } from 'react'
import HotAlbum from './components/HotAlbum'
import AllAlbum from './components/AllAlbum'
import './index.less'
const Songs: React.FC = () => {
  return (
    <div className="playlistWrapper wrap-v2">
      <HotAlbum />
      <AllAlbum />
    </div>
  )
}
export default memo(Songs)
