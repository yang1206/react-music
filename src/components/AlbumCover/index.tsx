import React, { memo } from 'react'
import { getSizeImage } from '@/utils/format'
import { Recommend } from '@/store/interface/recommend'
import './index.less'
//定义props类型
interface Props {
  info: Recommend.NewAlbums
  size: string
  width: string
  bgp: string
}
const AlbumCover: React.FC<Props> = (props: any) => {
  const { info, size, width, bgp } = props
  // 接收父组件传来的样式
  return (
    <div className="AlbumWrapper" style={{ width: width, height: size }}>
      <div className="album-image">
        <img src={getSizeImage(info.picUrl, 180)} style={{ width: width, height: size }} alt=""></img>
        <a href="/abc" className="cover sprite_cover" style={{ backgroundPosition: `0  ${bgp}` }}>
          {info.name}
        </a>
      </div>
      <div className="album-info" style={{ width: size }}>
        <div className="name">{info.name}</div>
        <div className="artist">{info.artist.name}</div>
      </div>
    </div>
  )
}

export default memo(AlbumCover)
